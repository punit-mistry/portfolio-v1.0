import { ArrowLeft, Calendar } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function BlogDetail({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  return (
    <article className="max-w-3xl mx-auto">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.excerpt,
          "datePublished": article.date,
          "author": {
            "@type": "Person",
            "name": "Punit Mistry",
            "url": "https://punit-mistry.netlify.app"
          },
          "url": `https://punit-mistry.netlify.app/articles/${article.id}`,
          "keywords": article.tags.join(", ")
        })}
      </script>
      <button
        onClick={onBack}
        className="font-cta inline-flex items-center gap-2 mb-10 transition-colors duration-300 btn-accent"
      >
        <ArrowLeft size={16} />
        Back to Articles
      </button>

      <h1
        className="font-heading mb-6"
        style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          letterSpacing: "-1.5px",
          color: "hsl(var(--foreground))",
        }}
      >
        {article.title}
      </h1>

      <div className="flex items-center gap-4 mb-10 font-mono text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          {article.date}
        </span>
        <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--muted-foreground))" }} />
        <span>{article.readTime}</span>
      </div>

      <div
        className="prose prose-invert max-w-none"
        style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.8 }}
      >
        {article.content.split("\n\n").map((paragraph, i) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="font-heading mt-10 mb-4"
                style={{
                  fontSize: "clamp(20px, 3vw, 28px)",
                  letterSpacing: "-0.5px",
                  color: "hsl(var(--foreground))",
                }}
              >
                {trimmed.replace("## ", "")}
              </h2>
            );
          }

          if (trimmed.startsWith("- ")) {
            return (
              <ul key={i} className="list-disc pl-5 mb-4 space-y-1.5">
                {trimmed.split("\n").map((line, j) => (
                  <li key={j}>{line.replace("- ", "")}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={i} className="mb-4 text-base">
              {trimmed}
            </p>
          );
        })}

        <div
          className="mt-12 p-6 rounded-xl"
          style={{
            background: "hsl(var(--muted))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <p className="font-heading text-sm mb-2" style={{ color: "hsl(var(--foreground))" }}>
            Want to build something similar?
          </p>
          <p className="font-mono text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            I'm available for freelance projects.{" "}
            <a
              href="https://wa.me/918286075880?text=Hey%20Punit%2C%20I'd%20love%20to%20work%20with%20you%20on%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              Let's talk
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
