
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SettingsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const SettingsCard = ({
  icon: Icon,
  title,
  description,
  className,
  children
}: SettingsCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={cn("overflow-hidden border-gold/20 hover:shadow-md transition-shadow duration-300", className)}>
        <CardHeader className="bg-gold/5 border-b border-gold/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/80 rounded-md shadow-sm">
              <Icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <CardTitle className="text-lg font-serif">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsCard;
