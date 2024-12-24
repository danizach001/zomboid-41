interface ModCounterProps {
  count: number;
}

export const ModCounter = ({ count }: ModCounterProps) => (
  <span className="text-sm text-muted-foreground">
    {count} {count === 1 ? 'mod' : 'mods'}
  </span>
);