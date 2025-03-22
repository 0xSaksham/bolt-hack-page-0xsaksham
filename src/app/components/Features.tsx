"use client";

import { Globe, Search, Sparkles, Trophy, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Trophy className="h-6 w-6 text-primary" />,
    title: "World Record Attempt",
    description:
      "This hackathon is aiming to win the Guinness Book of World Records by bringing together 100k+ builders to build simultaneously.",
  },
  {
    icon: <Globe className="h-6 w-6 text-secondary" />,
    title: "100% Virtual Event",
    description:
      "Join from anywhere in the world - no travel required. Connect with participants globally through our online platform.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Organized by Bolt.new",
    description:
      "Join the hackathon powered by Bolt.new, the most advanced AI code editor designed for modern developers.",
  },
  {
    icon: <Search className="h-6 w-6 text-secondary" />,
    title: "From Tweet to Reality",
    description:
      "Started as a simple tweet idea was transformed into the first-ever hackathon of its kind within hours by CEO Eric Simons.",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: "$1M+ in Prizes",
    description:
      "Compete for over $1 million in prizes across various categories and challenge tracks.",
  },
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border",
        (index === 0 || index === 3) && "lg:border-l border-border",
        index < 3 && "lg:border-b border-border"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted to-transparent pointer-events-none dark:from-muted/50" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-muted to-transparent pointer-events-none dark:from-muted/50" />
      )}
      <div className="mb-4 relative z-10 px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;
