interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-background container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">EMERGY TOOL</h1>
          <p className="mt-2 text-muted-foreground">
            Plataforma de Cálculo Emergia
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
