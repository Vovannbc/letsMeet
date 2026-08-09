import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import type { ReactNode } from 'react';

type CollapsibleWithLinkProps = {
  title: string;
  link: string;
  children: ReactNode;
};

export default function CollapsibleWithLink({ title, link, children }: CollapsibleWithLinkProps) {
  return (
    <Collapsible title={title}>
      {children}
      <ExternalLink href={link}>
        <ThemedText type="linkPrimary">Learn more</ThemedText>
      </ExternalLink>
    </Collapsible>
  );
}