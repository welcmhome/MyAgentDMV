type PlaceholderSectionProps = {
  title: string;
  description: string;
  emptyLabel: string;
};

export function PlaceholderSection({ title, description, emptyLabel }: PlaceholderSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <div className="module-card rounded-xl border-dashed border-[var(--border)] bg-black/20 p-8 text-center">
        <p className="font-mono text-xs text-muted">{emptyLabel}</p>
      </div>
    </section>
  );
}
