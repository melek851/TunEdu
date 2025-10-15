import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/lib/types';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground md:space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-1 md:space-x-2">
            <Link
              href={item.href}
              className={cn("transition-colors hover:text-foreground", index === items.length - 1 ? 'text-foreground font-medium' : '')}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
