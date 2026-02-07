import { Monaco } from "@monaco-editor/react";
import { Theme } from "../../../types";

type LanguageConfig = Record<
  string,
  {
    id: string;
    label: string;
    logoPath: string;
    pistonRuntime: { language: string; version: string };
    monacoLanguage: string;
    defaultCode: string;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
    defaultCode: `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);`,
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    logoPath: "/typescript.png",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// TypeScript Playground
interface NumberArray {
  numbers: number[];
  sum(): number;
  squares(): number[];
  evenNumbers(): number[];
}

class MathOperations implements NumberArray {
  constructor(public numbers: number[]) {}

  sum(): number {
    return this.numbers.reduce((acc, curr) => acc + curr, 0);
  }

  squares(): number[] {
    return this.numbers.map(n => n * n);
  }

  evenNumbers(): number[] {
    return this.numbers.filter(n => n % 2 === 0);
  }
}

const math = new MathOperations([1, 2, 3, 4, 5]);

console.log('Original numbers:', math.numbers);
console.log('Squared numbers:', math.squares());
console.log('Even numbers:', math.evenNumbers());
console.log('Sum of numbers:', math.sum());`,
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python Playground
numbers = [1, 2, 3, 4, 5]

# Map numbers to their squares
squares = [n ** 2 for n in numbers]
print(f"Original numbers: {numbers}")
print(f"Squared numbers: {squares}")

# Filter for even numbers
even_numbers = [n for n in numbers if n % 2 == 0]
print(f"Even numbers: {even_numbers}")

# Calculate sum
numbers_sum = sum(numbers)
print(f"Sum of numbers: {numbers_sum}")`,
  },
  java: {
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    pistonRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `
    // Java PlayGround
    public class Main {
  public static void main(String[] args) {
      // Create array
      int[] numbers = {1, 2, 3, 4, 5};

      // Print original numbers
      System.out.print("Original numbers: ");
      printArray(numbers);

      // Calculate and print squares
      int[] squares = new int[numbers.length];
      for (int i = 0; i < numbers.length; i++) {
          squares[i] = numbers[i] * numbers[i];
      }
      System.out.print("Squared numbers: ");
      printArray(squares);

      // Print even numbers
      System.out.print("Even numbers: ");
      for (int n : numbers) {
          if (n % 2 == 0) System.out.print(n + " ");
      }
      System.out.println();

      // Calculate and print sum
      int sum = 0;
      for (int n : numbers) sum += n;
      System.out.println("Sum of numbers: " + sum);
  }

  private static void printArray(int[] arr) {
      for (int n : arr) System.out.print(n + " ");
      System.out.println();
  }
}`,
  },
  go: {
    id: "go",
    label: "Go",
    logoPath: "/go.png",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `package main

import "fmt"

func main() {
  // Create slice
  numbers := []int{1, 2, 3, 4, 5}

  // Print original numbers
  fmt.Println("Original numbers:", numbers)

  // Calculate squares
  squares := make([]int, len(numbers))
  for i, n := range numbers {
      squares[i] = n * n
  }
  fmt.Println("Squared numbers:", squares)

  // Filter even numbers
  var evenNumbers []int
  for _, n := range numbers {
      if n%2 == 0 {
          evenNumbers = append(evenNumbers, n)
      }
  }
  fmt.Println("Even numbers:", evenNumbers)

  // Calculate sum
  sum := 0
  for _, n := range numbers {
      sum += n
  }
  fmt.Println("Sum of numbers:", sum)
}`,
  },
  rust: {
    id: "rust",
    label: "Rust",
    logoPath: "/rust.png",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `fn main() {
    // Create vector
    let numbers = vec![1, 2, 3, 4, 5];

    // Print original numbers
    println!("Original numbers: {:?}", numbers);

    // Calculate squares
    let squares: Vec<i32> = numbers
        .iter()
        .map(|&n| n * n)
        .collect();
    println!("Squared numbers: {:?}", squares);

    // Filter even numbers
    let even_numbers: Vec<i32> = numbers
        .iter()
        .filter(|&&n| n % 2 == 0)
        .cloned()
        .collect();
    println!("Even numbers: {:?}", even_numbers);

    // Calculate sum
    let sum: i32 = numbers.iter().sum();
    println!("Sum of numbers: {}", sum);
}`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.png",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // Create vector
    vector<int> numbers = {1, 2, 3, 4, 5};

    // Print original numbers
    cout << "Original numbers: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;

    // Calculate squares
    vector<int> squares;
    transform(numbers.begin(), numbers.end(),
              back_inserter(squares),
              [](int n) { return n * n; });

    cout << "Squared numbers: ";
    for (int n : squares) cout << n << " ";
    cout << endl;

    // Filter even numbers
    cout << "Even numbers: ";
    for (int n : numbers) {
        if (n % 2 == 0) cout << n << " ";
    }
    cout << endl;

    // Calculate sum
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "Sum of numbers: " << sum << endl;

    return 0;
}`,
  },
  csharp: {
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.png",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `using System;
using System.Linq;

class Program {
    static void Main() {
        // Create array
        int[] numbers = { 1, 2, 3, 4, 5 };

        // Print original numbers
        Console.WriteLine($"Original numbers: {string.Join(" ", numbers)}");

        // Calculate squares
        var squares = numbers.Select(n => n * n);
        Console.WriteLine($"Squared numbers: {string.Join(" ", squares)}");

        // Filter even numbers
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine($"Even numbers: {string.Join(" ", evenNumbers)}");

        // Calculate sum
        var sum = numbers.Sum();
        Console.WriteLine($"Sum of numbers: {sum}");
    }
}`,
  },
  ruby: {
    id: "ruby",
    label: "Ruby",
    logoPath: "/ruby.png",
    pistonRuntime: { language: "ruby", version: "3.0.1" },
    monacoLanguage: "ruby",
    defaultCode: `# Create array
numbers = [1, 2, 3, 4, 5]

# Print original numbers
puts "Original numbers: #{numbers.join(' ')}"

# Calculate squares
squares = numbers.map { |n| n * n }
puts "Squared numbers: #{squares.join(' ')}"

# Filter even numbers
even_numbers = numbers.select { |n| n.even? }
puts "Even numbers: #{even_numbers.join(' ')}"

# Calculate sum
sum = numbers.sum
puts "Sum of numbers: #{sum}"`,
  },
  swift: {
    id: "swift",
    label: "Swift",
    logoPath: "/swift.png",
    pistonRuntime: { language: "swift", version: "5.3.3" },
    monacoLanguage: "swift",
    defaultCode: `// Create array
let numbers = [1, 2, 3, 4, 5]

// Print original numbers
print("Original numbers: \\(numbers)")

// Calculate squares
let squares = numbers.map { $0 * $0 }
print("Squared numbers: \\(squares)")

// Filter even numbers
let evenNumbers = numbers.filter { $0 % 2 == 0 }
print("Even numbers: \\(evenNumbers)")

// Calculate sum
let sum = numbers.reduce(0, +)
print("Sum of numbers: \\(sum)")`,
  },
  c: {
    id: "c",
    label: "C",
    logoPath: "/c.png",
    pistonRuntime: { language: "c", version: "10.2.0" },
    monacoLanguage: "c",
    defaultCode: `// C Playground
#include <stdio.h>

int main() {

    printf("Hello, world!");

    return 0;
}`,
  },
};

export const THEMES: Theme[] = [
  { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
  { id: "vs-light", label: "VS Light", color: "#ffffff" },
  { id: "github-dark", label: "GitHub Dark", color: "#0d1117" },
  { id: "monokai", label: "Monokai", color: "#272822" },
  { id: "solarized-dark", label: "Solarized Dark", color: "#002b36" },
  { id: "night-owl", label: "Night Owl", color: "#011627" },
  { id: "nord", label: "Nord", color: "#969696" },
];

export const THEME_DEFINITONS = {
  nord: {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        background: "2E3440",
        token: "",
      },
      {
        foreground: "616e88",
        token: "comment",
      },
      {
        foreground: "a3be8c",
        token: "string",
      },
      {
        foreground: "b48ead",
        token: "constant.numeric",
      },
      {
        foreground: "81a1c1",
        token: "constant.language",
      },
      {
        foreground: "81a1c1",
        token: "keyword",
      },
      {
        foreground: "81a1c1",
        token: "storage",
      },
      {
        foreground: "81a1c1",
        token: "storage.type",
      },
      {
        foreground: "8fbcbb",
        token: "entity.name.class",
      },
      {
        foreground: "8fbcbb",
        fontStyle: "  bold",
        token: "entity.other.inherited-class",
      },
      {
        foreground: "88c0d0",
        token: "entity.name.function",
      },
      {
        foreground: "81a1c1",
        token: "entity.name.tag",
      },
      {
        foreground: "8fbcbb",
        token: "entity.other.attribute-name",
      },
      {
        foreground: "88c0d0",
        token: "support.function",
      },
      {
        foreground: "f8f8f0",
        background: "f92672",
        token: "invalid",
      },
      {
        foreground: "f8f8f0",
        background: "ae81ff",
        token: "invalid.deprecated",
      },
      {
        foreground: "b48ead",
        token: "constant.color.other.rgb-value",
      },
      {
        foreground: "ebcb8b",
        token: "constant.character.escape",
      },
      {
        foreground: "8fbcbb",
        token: "variable.other.constant",
      },
    ],
    colors: {
      "editor.foreground": "#D8DEE9",
      "editor.background": "#2E3440",
      "editor.selectionBackground": "#434C5ECC",
      "editor.lineHighlightBackground": "#3B4252",
      "editorCursor.foreground": "#D8DEE9",
      "editorWhitespace.foreground": "#434C5ECC",
    },
  },
  "night-owl": {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        background: "011627",
        token: "",
      },
      {
        foreground: "637777",
        token: "comment",
      },
      {
        foreground: "addb67",
        token: "string",
      },
      {
        foreground: "ecc48d",
        token: "vstring.quoted",
      },
      {
        foreground: "ecc48d",
        token: "variable.other.readwrite.js",
      },
      {
        foreground: "5ca7e4",
        token: "string.regexp",
      },
      {
        foreground: "5ca7e4",
        token: "string.regexp keyword.other",
      },
      {
        foreground: "5f7e97",
        token: "meta.function punctuation.separator.comma",
      },
      {
        foreground: "f78c6c",
        token: "constant.numeric",
      },
      {
        foreground: "f78c6c",
        token: "constant.character.numeric",
      },
      {
        foreground: "addb67",
        token: "variable",
      },
      {
        foreground: "c792ea",
        token: "keyword",
      },
      {
        foreground: "c792ea",
        token: "punctuation.accessor",
      },
      {
        foreground: "c792ea",
        token: "storage",
      },
      {
        foreground: "c792ea",
        token: "meta.var.expr",
      },
      {
        foreground: "c792ea",
        token:
          "meta.class meta.method.declaration meta.var.expr storage.type.jsm",
      },
      {
        foreground: "c792ea",
        token: "storage.type.property.js",
      },
      {
        foreground: "c792ea",
        token: "storage.type.property.ts",
      },
      {
        foreground: "c792ea",
        token: "storage.type.property.tsx",
      },
      {
        foreground: "82aaff",
        token: "storage.type",
      },
      {
        foreground: "ffcb8b",
        token: "entity.name.class",
      },
      {
        foreground: "ffcb8b",
        token: "meta.class entity.name.type.class",
      },
      {
        foreground: "addb67",
        token: "entity.other.inherited-class",
      },
      {
        foreground: "82aaff",
        token: "entity.name.function",
      },
      {
        foreground: "addb67",
        token: "punctuation.definition.variable",
      },
      {
        foreground: "d3423e",
        token: "punctuation.section.embedded",
      },
      {
        foreground: "d6deeb",
        token: "punctuation.terminator.expression",
      },
      {
        foreground: "d6deeb",
        token: "punctuation.definition.arguments",
      },
      {
        foreground: "d6deeb",
        token: "punctuation.definition.array",
      },
      {
        foreground: "d6deeb",
        token: "punctuation.section.array",
      },
      {
        foreground: "d6deeb",
        token: "meta.array",
      },
      {
        foreground: "d9f5dd",
        token: "punctuation.definition.list.begin",
      },
      {
        foreground: "d9f5dd",
        token: "punctuation.definition.list.end",
      },
      {
        foreground: "d9f5dd",
        token: "punctuation.separator.arguments",
      },
      {
        foreground: "d9f5dd",
        token: "punctuation.definition.list",
      },
      {
        foreground: "d3423e",
        token: "string.template meta.template.expression",
      },
      {
        foreground: "d6deeb",
        token: "string.template punctuation.definition.string",
      },
      {
        foreground: "c792ea",
        fontStyle: "italic",
        token: "italic",
      },
      {
        foreground: "addb67",
        fontStyle: "bold",
        token: "bold",
      },
      {
        foreground: "82aaff",
        token: "constant.language",
      },
      {
        foreground: "82aaff",
        token: "punctuation.definition.constant",
      },
      {
        foreground: "82aaff",
        token: "variable.other.constant",
      },
      {
        foreground: "7fdbca",
        token: "support.function.construct",
      },
      {
        foreground: "7fdbca",
        token: "keyword.other.new",
      },
      {
        foreground: "82aaff",
        token: "constant.character",
      },
      {
        foreground: "82aaff",
        token: "constant.other",
      },
      {
        foreground: "f78c6c",
        token: "constant.character.escape",
      },
      {
        foreground: "addb67",
        token: "entity.other.inherited-class",
      },
      {
        foreground: "d7dbe0",
        token: "variable.parameter",
      },
      {
        foreground: "7fdbca",
        token: "entity.name.tag",
      },
      {
        foreground: "cc2996",
        token: "punctuation.definition.tag.html",
      },
      {
        foreground: "cc2996",
        token: "punctuation.definition.tag.begin",
      },
      {
        foreground: "cc2996",
        token: "punctuation.definition.tag.end",
      },
      {
        foreground: "addb67",
        token: "entity.other.attribute-name",
      },
      {
        foreground: "addb67",
        token: "entity.name.tag.custom",
      },
      {
        foreground: "82aaff",
        token: "support.function",
      },
      {
        foreground: "82aaff",
        token: "support.constant",
      },
      {
        foreground: "7fdbca",
        token: "upport.constant.meta.property-value",
      },
      {
        foreground: "addb67",
        token: "support.type",
      },
      {
        foreground: "addb67",
        token: "support.class",
      },
      {
        foreground: "addb67",
        token: "support.variable.dom",
      },
      {
        foreground: "7fdbca",
        token: "support.constant",
      },
      {
        foreground: "7fdbca",
        token: "keyword.other.special-method",
      },
      {
        foreground: "7fdbca",
        token: "keyword.other.new",
      },
      {
        foreground: "7fdbca",
        token: "keyword.other.debugger",
      },
      {
        foreground: "7fdbca",
        token: "keyword.control",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.comparison",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.flow.js",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.flow.ts",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.flow.tsx",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.ruby",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.module.ruby",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.class.ruby",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.def.ruby",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.loop.js",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.loop.ts",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.import.js",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.import.ts",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.import.tsx",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.from.js",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.from.ts",
      },
      {
        foreground: "c792ea",
        token: "keyword.control.from.tsx",
      },
      {
        foreground: "ffffff",
        background: "ff2c83",
        token: "invalid",
      },
      {
        foreground: "ffffff",
        background: "d3423e",
        token: "invalid.deprecated",
      },
      {
        foreground: "7fdbca",
        token: "keyword.operator",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.relational",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.assignement",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.arithmetic",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.bitwise",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.increment",
      },
      {
        foreground: "c792ea",
        token: "keyword.operator.ternary",
      },
      {
        foreground: "637777",
        token: "comment.line.double-slash",
      },
      {
        foreground: "cdebf7",
        token: "object",
      },
      {
        foreground: "ff5874",
        token: "constant.language.null",
      },
      {
        foreground: "d6deeb",
        token: "meta.brace",
      },
      {
        foreground: "c792ea",
        token: "meta.delimiter.period",
      },
      {
        foreground: "d9f5dd",
        token: "punctuation.definition.string",
      },
      {
        foreground: "ff5874",
        token: "constant.language.boolean",
      },
      {
        foreground: "ffffff",
        token: "object.comma",
      },
      {
        foreground: "7fdbca",
        token: "variable.parameter.function",
      },
      {
        foreground: "80cbc4",
        token: "support.type.vendor.property-name",
      },
      {
        foreground: "80cbc4",
        token: "support.constant.vendor.property-value",
      },
      {
        foreground: "80cbc4",
        token: "support.type.property-name",
      },
      {
        foreground: "80cbc4",
        token: "meta.property-list entity.name.tag",
      },
      {
        foreground: "57eaf1",
        token: "meta.property-list entity.name.tag.reference",
      },
      {
        foreground: "f78c6c",
        token: "constant.other.color.rgb-value punctuation.definition.constant",
      },
      {
        foreground: "ffeb95",
        token: "constant.other.color",
      },
      {
        foreground: "ffeb95",
        token: "keyword.other.unit",
      },
      {
        foreground: "c792ea",
        token: "meta.selector",
      },
      {
        foreground: "fad430",
        token: "entity.other.attribute-name.id",
      },
      {
        foreground: "80cbc4",
        token: "meta.property-name",
      },
      {
        foreground: "c792ea",
        token: "entity.name.tag.doctype",
      },
      {
        foreground: "c792ea",
        token: "meta.tag.sgml.doctype",
      },
      {
        foreground: "d9f5dd",
        token: "punctuation.definition.parameters",
      },
      {
        foreground: "ecc48d",
        token: "string.quoted",
      },
      {
        foreground: "ecc48d",
        token: "string.quoted.double",
      },
      {
        foreground: "ecc48d",
        token: "string.quoted.single",
      },
      {
        foreground: "addb67",
        token: "support.constant.math",
      },
      {
        foreground: "addb67",
        token: "support.type.property-name.json",
      },
      {
        foreground: "addb67",
        token: "support.constant.json",
      },
      {
        foreground: "c789d6",
        token: "meta.structure.dictionary.value.json string.quoted.double",
      },
      {
        foreground: "80cbc4",
        token: "string.quoted.double.json punctuation.definition.string.json",
      },
      {
        foreground: "ff5874",
        token:
          "meta.structure.dictionary.json meta.structure.dictionary.value constant.language",
      },
      {
        foreground: "d6deeb",
        token: "variable.other.ruby",
      },
      {
        foreground: "ecc48d",
        token: "entity.name.type.class.ruby",
      },
      {
        foreground: "ecc48d",
        token: "keyword.control.class.ruby",
      },
      {
        foreground: "ecc48d",
        token: "meta.class.ruby",
      },
      {
        foreground: "7fdbca",
        token: "constant.language.symbol.hashkey.ruby",
      },
      {
        foreground: "e0eddd",
        background: "a57706",
        fontStyle: "italic",
        token: "meta.diff",
      },
      {
        foreground: "e0eddd",
        background: "a57706",
        fontStyle: "italic",
        token: "meta.diff.header",
      },
      {
        foreground: "ef535090",
        fontStyle: "italic",
        token: "markup.deleted",
      },
      {
        foreground: "a2bffc",
        fontStyle: "italic",
        token: "markup.changed",
      },
      {
        foreground: "a2bffc",
        fontStyle: "italic",
        token: "meta.diff.header.git",
      },
      {
        foreground: "a2bffc",
        fontStyle: "italic",
        token: "meta.diff.header.from-file",
      },
      {
        foreground: "a2bffc",
        fontStyle: "italic",
        token: "meta.diff.header.to-file",
      },
      {
        foreground: "219186",
        background: "eae3ca",
        token: "markup.inserted",
      },
      {
        foreground: "d3201f",
        token: "other.package.exclude",
      },
      {
        foreground: "d3201f",
        token: "other.remove",
      },
      {
        foreground: "269186",
        token: "other.add",
      },
      {
        foreground: "ff5874",
        token: "constant.language.python",
      },
      {
        foreground: "82aaff",
        token: "variable.parameter.function.python",
      },
      {
        foreground: "82aaff",
        token: "meta.function-call.arguments.python",
      },
      {
        foreground: "b2ccd6",
        token: "meta.function-call.python",
      },
      {
        foreground: "b2ccd6",
        token: "meta.function-call.generic.python",
      },
      {
        foreground: "d6deeb",
        token: "punctuation.python",
      },
      {
        foreground: "addb67",
        token: "entity.name.function.decorator.python",
      },
      {
        foreground: "8eace3",
        token: "source.python variable.language.special",
      },
      {
        foreground: "82b1ff",
        token: "markup.heading.markdown",
      },
      {
        foreground: "c792ea",
        fontStyle: "italic",
        token: "markup.italic.markdown",
      },
      {
        foreground: "addb67",
        fontStyle: "bold",
        token: "markup.bold.markdown",
      },
      {
        foreground: "697098",
        token: "markup.quote.markdown",
      },
      {
        foreground: "80cbc4",
        token: "markup.inline.raw.markdown",
      },
      {
        foreground: "ff869a",
        token: "markup.underline.link.markdown",
      },
      {
        foreground: "ff869a",
        token: "markup.underline.link.image.markdown",
      },
      {
        foreground: "d6deeb",
        token: "string.other.link.title.markdown",
      },
      {
        foreground: "d6deeb",
        token: "string.other.link.description.markdown",
      },
      {
        foreground: "82b1ff",
        token: "punctuation.definition.string.markdown",
      },
      {
        foreground: "82b1ff",
        token: "punctuation.definition.string.begin.markdown",
      },
      {
        foreground: "82b1ff",
        token: "punctuation.definition.string.end.markdown",
      },
      {
        foreground: "82b1ff",
        token: "meta.link.inline.markdown punctuation.definition.string",
      },
      {
        foreground: "7fdbca",
        token: "punctuation.definition.metadata.markdown",
      },
      {
        foreground: "82b1ff",
        token: "beginning.punctuation.definition.list.markdown",
      },
    ],
    colors: {
      "editor.foreground": "#d6deeb",
      "editor.background": "#011627",
      "editor.selectionBackground": "#5f7e9779",
      "editor.lineHighlightBackground": "#010E17",
      "editorCursor.foreground": "#80a4c2",
      "editorWhitespace.foreground": "#2e2040",
      "editorIndentGuide.background": "#5e81ce52",
      "editor.selectionHighlightBorder": "#122d42",
    },
  },
  "github-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6e7681" },
      { token: "string", foreground: "a5d6ff" },
      { token: "keyword", foreground: "ff7b72" },
      { token: "number", foreground: "79c0ff" },
      { token: "type", foreground: "ffa657" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "d2a8ff" },
      { token: "variable", foreground: "ffa657" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#161b22",
      "editorLineNumber.foreground": "#6e7681",
      "editorIndentGuide.background": "#21262d",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#264f7855",
    },
  },
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "string", foreground: "E6DB74" },
      { token: "keyword", foreground: "F92672" },
      { token: "number", foreground: "AE81FF" },
      { token: "type", foreground: "66D9EF" },
      { token: "class", foreground: "A6E22E" },
      { token: "function", foreground: "A6E22E" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "F92672" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#75715E",
      "editor.selectionBackground": "#49483E",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorCursor.foreground": "#F8F8F2",
      "editor.selectionHighlightBackground": "#49483E",
    },
  },
  "solarized-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "586e75" },
      { token: "string", foreground: "2aa198" },
      { token: "keyword", foreground: "859900" },
      { token: "number", foreground: "d33682" },
      { token: "type", foreground: "b58900" },
      { token: "class", foreground: "b58900" },
      { token: "function", foreground: "268bd2" },
      { token: "variable", foreground: "b58900" },
      { token: "operator", foreground: "859900" },
    ],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
      "editorLineNumber.foreground": "#586e75",
      "editor.selectionBackground": "#073642",
      "editor.lineHighlightBackground": "#073642",
      "editorCursor.foreground": "#839496",
      "editor.selectionHighlightBackground": "#073642",
    },
  },
};

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    });
  });
};
