export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalize it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Removes whitespace
      .replace(/[^\w-]+/g, '') // Removes non-words
      .replace(/_/g, '-') // Replace underlines
      .replace(/--+/g, '-') // Replace doble hyphens
      .replace(/-$/g, '') // Remove hyphen at the end

    return new Slug(slugText)
  }
}
