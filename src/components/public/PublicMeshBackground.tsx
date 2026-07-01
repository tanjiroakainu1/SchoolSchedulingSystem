interface PublicMeshBackgroundProps {
  variant?: 'dark' | 'light';
}

export function PublicMeshBackground({ variant = 'dark' }: PublicMeshBackgroundProps) {
  if (variant === 'light') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-primary-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -right-32 w-[520px] h-[520px] bg-primary-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute -bottom-48 -left-32 w-[560px] h-[560px] bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 dev-grid opacity-20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
    </div>
  );
}
