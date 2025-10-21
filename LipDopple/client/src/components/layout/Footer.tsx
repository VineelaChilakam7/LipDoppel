export function Footer() {
  return (
    <footer className="border-t mt-16 py-8 bg-background/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>
          © {new Date().getFullYear()} LipDopple. 💋 Find your perfect lipstick match without breaking the bank.
        </p>
      </div>
    </footer>
  );
}
