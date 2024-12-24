interface ModCounterProps {
  count: number;
}

export const ModCounter = ({ count }: ModCounterProps) => (
  <span className="text-sm text-muted-foreground translate-x-[5px] translate-y-[2px]">
    {count} {count === 1 ? 'mod' : 'mods'}
  </span>
);