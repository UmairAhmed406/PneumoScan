const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About PneumoScan</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          PneumoScan is an AI-powered tool for pneumonia detection from chest X-rays,
          developed for educational and research purposes.
        </p>
        <p className="text-muted-foreground">
          More content coming soon...
        </p>
      </div>
    </div>
  )
}

export default AboutPage
