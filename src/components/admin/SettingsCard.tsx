
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
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className={cn(
        "overflow-hidden border-gold/20 hover:shadow-lg transition-all duration-300",
        "hover:border-gold/40 backdrop-blur-sm",
        className
      )}>
        <CardHeader className="bg-gold/5 border-b border-gold/10 pb-4 relative overflow-hidden">
          <div className="flex items-center gap-3 z-10 relative">
            <motion.div 
              className="p-2 bg-white/90 dark:bg-white/20 rounded-md shadow-sm"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-5 w-5 text-gold" />
            </motion.div>
            <div>
              <CardTitle className="text-lg font-serif">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -mr-10 -mt-10 z-0"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gold/10 rounded-full blur-xl -ml-5 -mb-5 z-0"></div>
        </CardHeader>
        <CardContent className="pt-5 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsCard;
