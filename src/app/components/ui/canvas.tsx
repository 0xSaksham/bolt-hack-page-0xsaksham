"use client";

interface CanvasConfig {
  debug: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface OscillatorType {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  value: () => number;
  update: () => number;
}

class Oscillator implements OscillatorType {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  value: () => number;

  constructor(options: Partial<OscillatorType> = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this.value = () => this.offset + Math.sin(this.phase) * this.amplitude;
  }

  update(): number {
    this.phase += this.frequency;
    const value = this.offset + Math.sin(this.phase) * this.amplitude;
    this.value = () => value;
    return value;
  }
}

class Line {
  spring: number;
  friction: number;
  nodes: NodeType[];

  constructor(
    config: CanvasConfig,
    pos: { x: number; y: number },
    spring: number
  ) {
    this.spring = spring + 0.1 * Math.random() - 0.05;
    this.friction = config.friction + 0.01 * Math.random() - 0.005;
    this.nodes = Array.from({ length: config.size }, () => ({
      x: pos.x,
      y: pos.y,
      vx: 0,
      vy: 0,
    }));
  }

  update(config: CanvasConfig, pos: { x: number; y: number }) {
    let spring = this.spring;
    const firstNode = this.nodes[0];

    firstNode.vx += (pos.x - firstNode.x) * spring;
    firstNode.vy += (pos.y - firstNode.y) * spring;

    for (let i = 1; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const prevNode = this.nodes[i - 1];

      node.vx += (prevNode.x - node.x) * spring;
      node.vy += (prevNode.y - node.y) * spring;
      node.vx += prevNode.vx * config.dampening;
      node.vy += prevNode.vy * config.dampening;
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      spring *= config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [firstNode, ...rest] = this.nodes;
    ctx.beginPath();
    ctx.moveTo(firstNode.x, firstNode.y);

    for (let i = 1; i < rest.length - 1; i++) {
      const node = rest[i];
      const nextNode = rest[i + 1];
      const x = 0.5 * (node.x + nextNode.x);
      const y = 0.5 * (node.y + nextNode.y);
      ctx.quadraticCurveTo(node.x, node.y, x, y);
    }

    const lastSecond = rest[rest.length - 2];
    const last = rest[rest.length - 1];
    ctx.quadraticCurveTo(lastSecond.x, lastSecond.y, last.x, last.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export class CanvasEffect {
  private ctx: CanvasRenderingContext2D;
  private oscillator: Oscillator;
  private lines: Line[] = [];
  private pos: { x: number; y: number } = { x: 0, y: 0 };
  private config: CanvasConfig = {
    debug: false,
    friction: 0.5,
    trails: 60, // Reduced for better performance
    size: 40, // Reduced for better performance
    dampening: 0.025,
    tension: 0.99,
  };
  private rafId: number | null = null;
  private isRunning = false;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    this.ctx = ctx;
    this.oscillator = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    this.initializeListeners();
    this.resizeCanvas();
  }

  private initializeListeners() {
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    window.addEventListener("blur", () => this.stop());
    window.addEventListener("focus", () => this.start());
  }

  private resizeCanvas = () => {
    const canvas = this.ctx.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  private createLines() {
    this.lines = Array.from(
      { length: this.config.trails },
      (_, i) =>
        new Line(this.config, this.pos, 0.45 + (i / this.config.trails) * 0.025)
    );
  }

  public updateMousePosition = (x: number, y: number) => {
    this.pos.x = x;
    this.pos.y = y;

    if (this.lines.length === 0) {
      this.createLines();
      this.start();
    }
  };

  private render = () => {
    if (!this.isRunning) return;

    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.strokeStyle = `hsla(${Math.round(
      this.oscillator.update()
    )},100%,50%,0.025)`;
    this.ctx.lineWidth = 10;

    this.lines.forEach((line) => {
      line.update(this.config, this.pos);
      line.draw(this.ctx);
    });

    this.rafId = requestAnimationFrame(this.render);
  };

  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  public cleanup() {
    this.stop();
    window.removeEventListener("resize", this.resizeCanvas);
    window.removeEventListener("blur", () => this.stop());
    window.removeEventListener("focus", () => this.start());
  }
}
