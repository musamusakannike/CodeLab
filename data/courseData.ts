// Course data structure with lessons, content, and progress tracking

export type ContentType = "text" | "image" | "quiz" | "code";

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ContentBase {
  id: string;
  title: string;
  type: ContentType;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface TextContent extends ContentBase {
  type: "text";
  text: string;
}

export interface ImageContent extends ContentBase {
  type: "image";
  text: string;
  imageUrl: string;
}

export interface CodeContent extends ContentBase {
  type: "code";
  text: string;
  code: string;
  language: string;
}

export interface QuizContent extends ContentBase {
  type: "quiz";
  question: string;
  options: QuizOption[];
  explanation: string;
}

export type Content = TextContent | ImageContent | QuizContent | CodeContent;

export interface Lesson {
  id: string;
  title: string;
  description: string;
  contents: Content[];
  isCompleted: boolean;
  isLocked: boolean;
  duration: number; // in minutes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isEarned: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  isTrending: boolean;
  isEnrolled: boolean;
  progress: number; // 0-100
  lessons: Lesson[];
  achievements: Achievement[];
  instructor: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  totalDuration: number; // in minutes
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

export interface UserProgress {
  userId: string;
  enrolledCourses: {
    courseId: string;
    lastAccessedDate: Date;
    completedLessons: string[];
    completedContents: string[];
    earnedAchievements: string[];
    earnedGems: number;
  }[];
  streak: {
    currentStreak: number;
    lastLoginDate: Date;
    highestStreak: number;
  };
  totalGems: number;
  earnedBadges: string[];
}

// Sample course data
export const courses: Course[] = [
  {
    id: "1",
    title: "Python for Absolute Beginners",
    description:
      "Learn Python programming from scratch with this comprehensive course designed for beginners. Master the fundamentals, build real projects, and gain the skills needed to start your programming journey.",
    thumbnailUrl:
      "https://i.ibb.co/0yN6QNV1/Chat-GPT-Image-Apr-5-2025-11-45-51-AM.png",
    category: "Programming",
    isTrending: true,
    isEnrolled: true,
    progress: 15,
    instructor: {
      name: "Dr. Alex Morgan",
      title: "Python Developer & Educator",
      avatarUrl:
        "https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png",
    },
    totalDuration: 840, // 14 hours total
    level: "Beginner",
    tags: ["python", "programming", "coding", "computer science"],
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Python",
        description:
          "Learn what Python is, why it's popular, and set up your development environment.",
        isCompleted: true,
        isLocked: false,
        duration: 45,
        contents: [
          {
            id: "1-1-1",
            title: "What is Python and Why Learn It?",
            type: "text",
            text: "Python is a high-level, interpreted programming language known for its readability and simplicity. It's widely used in web development, data science, artificial intelligence, scientific computing, and automation. Python's clean syntax and extensive libraries make it an excellent first language for beginners and a powerful tool for professionals.",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "1-1-2",
            title: "Installing Python",
            type: "image",
            text: "To get started with Python, you need to install it on your computer. The installation process varies slightly depending on your operating system (Windows, macOS, or Linux). Visit python.org to download the latest version and follow the installation instructions for your platform.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "1-1-3",
            title: "Introduction to Python IDEs",
            type: "text",
            text: "An Integrated Development Environment (IDE) makes coding in Python easier. Popular options include VS Code, PyCharm, IDLE (comes with Python), and Jupyter Notebooks. Each has different features, but all provide code editing, syntax highlighting, and execution capabilities.",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "1-1-4",
            title: "Your First Python Program",
            type: "code",
            text: "Let's write your first Python program! This simple program demonstrates how Python executes code and outputs results.",
            code: 'print("Hello, World!")',
            language: "python",
            isCompleted: true,
            isLocked: false,
          },
          {
            id: "1-1-5",
            title: "Python Interpreter vs. Script",
            type: "text",
            text: "Python can be used in two ways: interactively through the interpreter (typing commands one at a time) or by writing scripts (files with .py extension). The interpreter is great for testing small code snippets, while scripts are better for larger programs that you want to save and run multiple times.",
            isCompleted: false,
            isLocked: false,
          },
          {
            id: "1-1-6",
            title: "Introduction to Python Quiz",
            type: "quiz",
            question:
              "Which of the following is NOT a common use case for Python?",
            options: [
              { id: "a", text: "Web Development", isCorrect: false },
              { id: "b", text: "Data Science", isCorrect: false },
              { id: "c", text: "Mobile App Development", isCorrect: true },
              { id: "d", text: "Automation", isCorrect: false },
            ],
            explanation:
              "While Python can be used for mobile app development with frameworks like Kivy or BeeWare, it's not as common as native development languages like Swift, Kotlin, or frameworks like React Native. Python is more commonly used for web development, data science, AI, and automation.",
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-2",
        title: "Python Basics",
        description:
          "Learn the fundamental concepts of Python programming including syntax, variables, and data types.",
        isCompleted: false,
        isLocked: false,
        duration: 60,
        contents: [
          {
            id: "1-2-1",
            title: "Python Syntax and Indentation",
            type: "text",
            text: "Python uses indentation (whitespace at the beginning of a line) to define code blocks, unlike many languages that use braces {}. Consistent indentation is crucial in Python - typically 4 spaces per indentation level. This enforces clean, readable code but requires attention to spacing.",
            isCompleted: false,
            isLocked: false,
          },
          {
            id: "1-2-2",
            title: "Variables and Data Types",
            type: "text",
            text: "Variables in Python are created when you assign a value: x = 10. Python has several built-in data types: integers (whole numbers), floats (decimal numbers), strings (text), and booleans (True/False). Python is dynamically typed, meaning you don't need to declare a variable's type explicitly.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-2-3",
            title: "Working with Numbers and Strings",
            type: "code",
            text: "Python makes it easy to work with numbers and strings. You can perform mathematical operations with numbers and manipulate strings with various methods. Strings can be created with single or double quotes and support operations like concatenation (joining) and slicing (extracting parts).",
            code: "# Numbers\nx = 10\ny = 5.5\nprint(f\"Addition: {x + y}\")\nprint(f\"Multiplication: {x * y}\")\n\n# Strings\nname = \"Python\"\nprint(f\"Hello, {name}!\")\nprint(f\"First character: {name[0]}\")\nprint(f\"Last character: {name[-1]}\")\nprint(f\"Length: {len(name)}\")",
            language: "python",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-2-4",
            title: "Comments and Best Practices",
            type: "text",
            text: 'Comments in Python start with the # symbol. They\'re ignored by the interpreter but help other programmers (and your future self) understand your code. Good comments explain why something is done, not what is done. Python also has docstrings (multi-line comments) enclosed in triple quotes."""',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-2-5",
            title: "Getting Input from Users",
            type: "text",
            text: 'The input() function allows your program to receive data from users. For example: name = input("Enter your name: "). This displays the prompt and waits for the user to type something and press Enter. The input is always returned as a string, so you may need to convert it to another type.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-2-6",
            title: "Type Conversion and Casting",
            type: "text",
            text: 'Python provides functions to convert between data types: int(), float(), str(), bool(). This is useful when you need to perform operations that require specific types, or when processing user input. For example, to convert user input to an integer: age = int(input("Enter your age: ")).',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-2-7",
            title: "Python Basics Quiz",
            type: "quiz",
            question:
              'What will be the output of the following code?\n\nx = 5\ny = "10"\nprint(str(x) + y)',
            options: [
              { id: "a", text: "15", isCorrect: false },
              { id: "b", text: "510", isCorrect: true },
              { id: "c", text: "Error", isCorrect: false },
              { id: "d", text: "5 + 10", isCorrect: false },
            ],
            explanation:
              'The code converts the integer 5 to a string using str(x), then concatenates it with the string "10". String concatenation joins the strings together, resulting in "510".',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-3",
        title: "Operators and Expressions",
        description:
          "Learn about different types of operators in Python and how to use them in expressions.",
        isCompleted: false,
        isLocked: true,
        duration: 50,
        contents: [
          {
            id: "1-3-1",
            title: "Arithmetic Operators",
            type: "text",
            text: "Python supports standard arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), floor division (//), modulus (%), and exponentiation (**). These operators work as expected with numeric values and follow the order of operations (PEMDAS).",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-3-2",
            title: "Comparison Operators",
            type: "text",
            text: "Comparison operators compare values and return boolean results (True or False). Python includes: equal to (==), not equal to (!=), greater than (>), less than (<), greater than or equal to (>=), and less than or equal to (<=). These are essential for conditional statements.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-3-3",
            title: "Logical Operators",
            type: "text",
            text: 'Python has three logical operators: and, or, and not. These operators work with boolean values to create compound conditions. "and" returns True if both operands are True, "or" returns True if at least one operand is True, and "not" inverts the boolean value.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-3-4",
            title: "Assignment Operators",
            type: "image",
            text: "Assignment operators assign values to variables. The basic assignment operator is =. Python also has compound assignment operators like +=, -=, *=, /=, etc., which perform an operation and assignment in one step. For example, x += 5 is equivalent to x = x + 5.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-3-5",
            title: "Order of Operations",
            type: "text",
            text: "Python follows the PEMDAS rule for the order of operations: Parentheses, Exponents, Multiplication/Division (from left to right), Addition/Subtraction (from left to right). You can use parentheses to override this order and make your expressions clearer.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-3-6",
            title: "Operators Quiz",
            type: "quiz",
            question:
              "What is the value of x after the following code executes?\n\nx = 10\nx += 5\nx *= 2\nx //= 3",
            options: [
              { id: "a", text: "10", isCorrect: true },
              { id: "b", text: "30", isCorrect: false },
              { id: "c", text: "9", isCorrect: false },
              { id: "d", text: "5", isCorrect: false },
            ],
            explanation:
              "Starting with x = 10, we add 5 to get x = 15, then multiply by 2 to get x = 30, and finally perform floor division by 3 to get x = 10.",
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-4",
        title: "Control Flow",
        description:
          "Learn how to control the flow of your program with conditional statements.",
        isCompleted: false,
        isLocked: true,
        duration: 55,
        contents: [
          {
            id: "1-4-1",
            title: "if, elif, and else Statements",
            type: "text",
            text: 'Conditional statements let your program make decisions. The "if" statement executes code if a condition is True. "elif" (else if) checks additional conditions if the previous ones are False. "else" executes code when all conditions are False. These statements control which code blocks run based on different conditions.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-4-2",
            title: "Nested Conditionals",
            type: "text",
            text: "You can place conditional statements inside other conditional statements, creating nested conditionals. This allows for more complex decision-making, where a second decision depends on the result of the first. However, deeply nested conditionals can become hard to read, so use them judiciously.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-4-3",
            title: "Truthy and Falsy Values",
            type: "text",
            text: 'In Python, values can be evaluated as True or False in a boolean context. Falsy values include: None, False, zero (0, 0.0), empty sequences ("", [], ()), and empty mappings ({}). Everything else is considered truthy. This concept is useful in conditional statements and while loops.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-4-4",
            title: "Simple Grade Calculator Example",
            type: "image",
            text: "Let's create a simple grade calculator using conditional statements. The program takes a numerical score as input and outputs the corresponding letter grade based on standard grading scales (A, B, C, D, F).",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-4-5",
            title: "Control Flow Quiz",
            type: "quiz",
            question:
              'What will the following code print?\n\nx = 5\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelif x == 5:\n    print("C")\nelse:\n    print("D")',
            options: [
              { id: "a", text: "A", isCorrect: false },
              { id: "b", text: "B", isCorrect: false },
              { id: "c", text: "C", isCorrect: true },
              { id: "d", text: "D", isCorrect: false },
            ],
            explanation:
              'Since x = 5, the first condition (x > 10) is False, so we check the next one. The second condition (x > 5) is also False. The third condition (x == 5) is True, so "C" is printed.',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-5",
        title: "Loops and Iteration",
        description: "Learn how to repeat actions in Python using loops.",
        isCompleted: false,
        isLocked: true,
        duration: 60,
        contents: [
          {
            id: "1-5-1",
            title: "while Loop",
            type: "text",
            text: "The while loop executes a block of code as long as a condition is True. It's useful when you don't know in advance how many iterations you need. Be careful to ensure the condition eventually becomes False, or you'll create an infinite loop that never stops.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-5-2",
            title: "for Loop with range()",
            type: "text",
            text: "The for loop in Python iterates over a sequence (like a list, tuple, or string) or other iterable objects. The range() function generates a sequence of numbers, making it perfect for for loops when you need to repeat something a specific number of times.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-5-3",
            title: "Loop Control Statements",
            type: "text",
            text: "Python provides statements to control loop execution: break exits the loop completely, continue skips to the next iteration, and pass does nothing (acts as a placeholder). These statements give you fine-grained control over how your loops execute.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-5-4",
            title: "Looping Through Strings and Lists",
            type: "image",
            text: 'You can use for loops to iterate through each character in a string or each item in a list. This is a powerful way to process data collections item by item. For example: for char in "Python": print(char) will print each letter of "Python" on a new line.',
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-5-5",
            title: "Nested Loops",
            type: "text",
            text: "You can place one loop inside another, creating nested loops. The inner loop completes all its iterations for each iteration of the outer loop. Nested loops are useful for working with multi-dimensional data or generating combinations, but they can be computationally expensive.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-5-6",
            title: "Loops Quiz",
            type: "quiz",
            question:
              'What will the following code print?\n\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i, end=" ")',
            options: [
              { id: "a", text: "1 2 3 4 5", isCorrect: false },
              { id: "b", text: "1 2 4 5", isCorrect: true },
              { id: "c", text: "1 2", isCorrect: false },
              { id: "d", text: "3", isCorrect: false },
            ],
            explanation:
              'The loop iterates through numbers 1 to 5. When i equals 3, the continue statement skips the rest of that iteration, so 3 is not printed. The output is "1 2 4 5".',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-6",
        title: "Data Structures — Lists and Tuples",
        description:
          "Learn about Python's built-in data structures for storing collections of items.",
        isCompleted: false,
        isLocked: true,
        duration: 65,
        contents: [
          {
            id: "1-6-1",
            title: "Creating and Accessing Lists",
            type: "text",
            text: "Lists are ordered, mutable collections of items. Create a list with square brackets: my_list = [1, 2, 3]. Access items by index (starting at 0): my_list[0] returns 1. Lists can contain items of different types and can be modified after creation.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-6-2",
            title: "List Methods",
            type: "text",
            text: "Python lists have many built-in methods: append() adds an item to the end, insert() adds an item at a specific position, remove() removes an item by value, pop() removes an item by index, sort() sorts the list, and many more. These methods make lists very versatile for data manipulation.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-6-3",
            title: "Slicing and Indexing",
            type: "image",
            text: "Slicing extracts a portion of a list: my_list[1:4] returns items at indices 1, 2, and 3. You can also use negative indices (counting from the end): my_list[-1] is the last item. Slicing syntax is [start:stop:step], where all parameters are optional.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-6-4",
            title: "Tuples and When to Use Them",
            type: "text",
            text: "Tuples are similar to lists but are immutable (cannot be changed after creation). Create a tuple with parentheses: my_tuple = (1, 2, 3). Tuples are faster than lists and can be used as dictionary keys. Use tuples for collections of items that shouldn't change, like coordinates or RGB color values.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-6-5",
            title: "List vs Tuple",
            type: "text",
            text: "The main difference between lists and tuples is mutability: lists can be modified, tuples cannot. Lists use square brackets [], tuples use parentheses (). Lists have more built-in methods because they're mutable. Choose based on whether you need to modify the collection after creation.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-6-6",
            title: "Lists and Tuples Quiz",
            type: "quiz",
            question:
              "What will be the output of the following code?\n\nmy_list = [10, 20, 30, 40, 50]\nprint(my_list[1:4:2])",
            options: [
              { id: "a", text: "[20, 30, 40]", isCorrect: false },
              { id: "b", text: "[20, 40]", isCorrect: true },
              { id: "c", text: "[10, 30, 50]", isCorrect: false },
              { id: "d", text: "[20, 30]", isCorrect: false },
            ],
            explanation:
              "The slice [1:4:2] means: start at index 1 (which is 20), go up to but not including index 4 (which is 50), and take every 2nd item. So we get items at indices 1 and 3, which are 20 and 40.",
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-7",
        title: "Working with Dictionaries and Sets",
        description:
          "Learn about Python's key-value stores and unordered collections.",
        isCompleted: false,
        isLocked: true,
        duration: 60,
        contents: [
          {
            id: "1-7-1",
            title: "What is a Dictionary?",
            type: "text",
            text: 'Dictionaries are unordered collections of key-value pairs. They\'re optimized for retrieving data when you know the key. Create a dictionary with curly braces: my_dict = {"name": "John", "age": 30}. Dictionaries are mutable and can store any data type as values.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-7-2",
            title: "Creating and Accessing Dictionary Items",
            type: "text",
            text: 'Access dictionary values by their keys: my_dict["name"] returns "John". Add or modify items by assigning to a key: my_dict["email"] = "john@example.com". If the key exists, its value is updated; if not, a new key-value pair is created.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-7-3",
            title: "Dictionary Methods",
            type: "image",
            text: "Dictionaries have useful methods: get() retrieves a value with a fallback if the key doesn't exist, keys() returns all keys, values() returns all values, items() returns key-value pairs, and pop() removes a key and returns its value.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-7-4",
            title: "Introduction to Sets",
            type: "text",
            text: "Sets are unordered collections of unique items. Create a set with curly braces: my_set = {1, 2, 3} or by converting another collection: my_set = set([1, 2, 2, 3]) (note that duplicates are removed). Sets are useful for membership testing and eliminating duplicates.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-7-5",
            title: "Set Methods and Operations",
            type: "text",
            text: "Sets support mathematical operations: union (|), intersection (&), difference (-), and symmetric difference (^). They also have methods like add(), remove(), and discard(). Sets are mutable but can only contain hashable (immutable) items.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-7-6",
            title: "Dictionaries and Sets Quiz",
            type: "quiz",
            question:
              'What will be the output of the following code?\n\nmy_dict = {"a": 1, "b": 2}\nmy_dict["c"] = 3\nmy_dict["a"] = 4\nprint(sum(my_dict.values()))',
            options: [
              { id: "a", text: "3", isCorrect: false },
              { id: "b", text: "6", isCorrect: false },
              { id: "c", text: "9", isCorrect: true },
              { id: "d", text: "10", isCorrect: false },
            ],
            explanation:
              'After all operations, my_dict contains {"a": 4, "b": 2, "c": 3}. The sum of these values is 4 + 2 + 3 = 9.',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-8",
        title: "Functions and Scope",
        description:
          "Learn how to create reusable blocks of code with functions.",
        isCompleted: false,
        isLocked: true,
        duration: 70,
        contents: [
          {
            id: "1-8-1",
            title: "Defining and Calling Functions",
            type: "text",
            text: 'Functions are reusable blocks of code defined with the def keyword: def greet(): print("Hello!"). Call a function by using its name followed by parentheses: greet(). Functions help organize code, reduce repetition, and make programs more modular and maintainable.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-8-2",
            title: "Function Parameters and Return Values",
            type: "text",
            text: 'Functions can accept inputs (parameters) and provide outputs (return values). Parameters are defined in parentheses: def greet(name): print(f"Hello, {name}!"). The return statement sends a value back to the caller: def add(a, b): return a + b.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-8-3",
            title: "Default Parameters",
            type: "image",
            text: 'You can assign default values to parameters: def greet(name="World"): print(f"Hello, {name}!"). If the caller doesn\'t provide this argument, the default value is used. This makes functions more flexible and easier to use in different contexts.',
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-8-4",
            title: "Variable Scope: Global vs Local",
            type: "text",
            text: "Variables defined inside a function have local scope (only accessible within that function). Variables defined outside all functions have global scope (accessible throughout the program). To modify a global variable inside a function, use the global keyword.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-8-5",
            title: "Lambda Functions",
            type: "text",
            text: "Lambda functions are small, anonymous functions defined with the lambda keyword: square = lambda x: x**2. They can take any number of arguments but can only have one expression. Lambda functions are useful for short operations, especially when passing functions as arguments.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-8-6",
            title: "Functions Quiz",
            type: "quiz",
            question:
              "What will be the output of the following code?\n\ndef func(x, y=5):\n    return x * y\n\nprint(func(3))",
            options: [
              { id: "a", text: "3", isCorrect: false },
              { id: "b", text: "5", isCorrect: false },
              { id: "c", text: "15", isCorrect: true },
              { id: "d", text: "Error", isCorrect: false },
            ],
            explanation:
              "The function multiplies x by y. When called with just one argument (3), the default value of y (5) is used. So the calculation is 3 * 5 = 15.",
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-9",
        title: "Error Handling",
        description: "Learn how to handle errors and exceptions in Python.",
        isCompleted: false,
        isLocked: true,
        duration: 55,
        contents: [
          {
            id: "1-9-1",
            title: "What are Errors and Exceptions?",
            type: "text",
            text: "Errors are problems in a program that prevent it from running, like syntax errors. Exceptions are events that occur during execution that disrupt the normal flow, like trying to divide by zero. Python has many built-in exception types that provide information about what went wrong.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-9-2",
            title: "Using try, except, else, and finally",
            type: "text",
            text: "The try block contains code that might raise an exception. The except block handles specific exceptions. The else block runs if no exceptions occur. The finally block always executes, regardless of whether an exception occurred. This structure provides complete control over error handling.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-9-3",
            title: "Catching Specific Exceptions",
            type: "image",
            text: 'You can catch specific exception types: try: x = 1/0 except ZeroDivisionError: print("Can\'t divide by zero!"). This allows different handling for different error types. You can also catch multiple exception types in a single except block or in separate blocks.',
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-9-4",
            title: "Writing Error-Proof Programs",
            type: "text",
            text: "Good error handling makes programs more robust. Anticipate what might go wrong and handle those cases gracefully. Provide helpful error messages to users. Don't catch exceptions too broadly, as this can hide bugs. Remember that preventing errors is often better than handling them.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-9-5",
            title: "Error Handling Quiz",
            type: "quiz",
            question:
              'What will be the output of the following code?\n\ntry:\n    print(10/0)\nexcept ZeroDivisionError:\n    print("A")\nelse:\n    print("B")\nfinally:\n    print("C")',
            options: [
              { id: "a", text: "A B C", isCorrect: false },
              { id: "b", text: "A C", isCorrect: true },
              { id: "c", text: "B C", isCorrect: false },
              { id: "d", text: "C", isCorrect: false },
            ],
            explanation:
              'The code tries to divide 10 by 0, which raises a ZeroDivisionError. The except block catches this and prints "A". The else block is skipped because an exception occurred. The finally block always executes, so "C" is printed. The output is "A C".',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-10",
        title: "Working with Files",
        description: "Learn how to read from and write to files in Python.",
        isCompleted: false,
        isLocked: true,
        duration: 60,
        contents: [
          {
            id: "1-10-1",
            title: "Reading from a File",
            type: "text",
            text: 'To read a file, first open it: file = open("filename.txt", "r"). Then read its contents: content = file.read(). Don\'t forget to close the file when done: file.close(). You can read the entire file at once or line by line with a for loop: for line in file:.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-10-2",
            title: "Writing to a File",
            type: "text",
            text: 'To write to a file, open it in write mode: file = open("filename.txt", "w"). Then use the write method: file.write("Hello, world!"). Write mode overwrites the entire file. To add to an existing file without overwriting, use append mode: open("filename.txt", "a").',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-10-3",
            title: "Working with .txt files",
            type: "image",
            text: "Text files (.txt) store plain text that can be read and written line by line. They're simple but versatile for storing data, logs, or configuration information. Python makes it easy to process text files with string methods like split(), strip(), and join().",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-10-4",
            title: "File Modes",
            type: "text",
            text: 'File modes determine how the file is opened: "r" (read), "w" (write), "a" (append), "r+" (read and write), "b" (binary mode, used with other modes like "rb" or "wb"). Choose the appropriate mode based on what you need to do with the file.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-10-5",
            title: "Using with Statement for File Handling",
            type: "text",
            text: 'The with statement automatically closes files when you\'re done: with open("filename.txt", "r") as file: content = file.read(). This is the recommended way to work with files because it ensures proper cleanup even if exceptions occur. It\'s shorter, cleaner, and safer than manually opening and closing files.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-10-6",
            title: "File Handling Quiz",
            type: "quiz",
            question:
              'What happens if you open a file in "w" mode that already exists?',
            options: [
              { id: "a", text: "The file is left unchanged", isCorrect: false },
              {
                id: "b",
                text: "New content is appended to the existing content",
                isCorrect: false,
              },
              {
                id: "c",
                text: "The existing content is completely overwritten",
                isCorrect: true,
              },
              { id: "d", text: "An error is raised", isCorrect: false },
            ],
            explanation:
              'Opening a file in "w" (write) mode truncates the file, meaning all existing content is deleted. Any new content you write will start from an empty file. If you want to add to existing content without deleting it, use "a" (append) mode instead.',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-11",
        title: "Python Modules and Packages",
        description:
          "Learn how to organize and reuse code with modules and packages.",
        isCompleted: false,
        isLocked: true,
        duration: 65,
        contents: [
          {
            id: "1-11-1",
            title: "What are Modules?",
            type: "text",
            text: "A module is a Python file containing code (functions, variables, classes) that can be imported and used in other Python files. Modules help organize related code and make it reusable across different programs. They're a fundamental way to structure larger Python applications.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-11-2",
            title: "Importing Built-in Modules",
            type: "text",
            text: "Python comes with many built-in modules like math, random, datetime, and os. Import a module with the import statement: import math. Then use its functions with dot notation: math.sqrt(16). You can also import specific functions: from math import sqrt, or rename modules: import math as m.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-11-3",
            title: "Creating Your Own Module",
            type: "image",
            text: "To create a module, simply write Python code in a .py file. For example, create mymodule.py with functions and variables. Then import it in another file: import mymodule. Your module can be imported just like built-in modules, making your code more organized and reusable.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-11-4",
            title: "Introduction to pip and Installing External Packages",
            type: "text",
            text: "pip is Python's package manager, used to install and manage external packages from the Python Package Index (PyPI). Install a package with: pip install package_name. This gives you access to thousands of third-party libraries that extend Python's capabilities for specific tasks like web development, data analysis, or machine learning.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-11-5",
            title: "Modules and Packages Quiz",
            type: "quiz",
            question:
              "What is the correct way to import the sqrt function from the math module?",
            options: [
              { id: "a", text: "import sqrt from math", isCorrect: false },
              { id: "b", text: "from math import sqrt", isCorrect: true },
              { id: "c", text: "import math.sqrt", isCorrect: false },
              { id: "d", text: "from sqrt import math", isCorrect: false },
            ],
            explanation:
              'The correct syntax is "from math import sqrt". This imports just the sqrt function from the math module, allowing you to use it directly (sqrt(16)) without the module prefix.',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-12",
        title: "Introduction to Object-Oriented Programming (OOP)",
        description:
          "Learn the basics of object-oriented programming in Python.",
        isCompleted: false,
        isLocked: true,
        duration: 75,
        contents: [
          {
            id: "1-12-1",
            title: "What is OOP?",
            type: "text",
            text: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data (attributes) and code (methods). OOP helps organize complex code, model real-world entities, and create reusable, modular programs. Python is a multi-paradigm language that fully supports OOP.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-12-2",
            title: "Creating Classes and Objects",
            type: "text",
            text: "A class is a blueprint for creating objects. Define a class with the class keyword: class Dog: pass. Create an object (instance) of the class: my_dog = Dog(). Classes can have attributes (variables) and methods (functions) that define the properties and behaviors of the objects.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-12-3",
            title: "__init__ Method",
            type: "image",
            text: "The __init__ method initializes a new object. It's called automatically when an object is created: class Dog: def __init__(self, name): self.name = name. The self parameter refers to the current instance and must be the first parameter of any instance method.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-12-4",
            title: "Class Methods and Attributes",
            type: "text",
            text: "Methods are functions defined within a class that operate on instances of the class. Instance attributes are unique to each object, while class attributes are shared by all instances. Methods can access and modify an object's attributes using the self parameter.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-12-5",
            title: "Understanding self",
            type: "text",
            text: "In Python, self is a convention for the first parameter of instance methods. It refers to the instance on which the method is called. When you call my_dog.bark(), Python automatically passes my_dog as the self parameter to the bark method. This is how methods know which object's data to operate on.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-12-6",
            title: "OOP Quiz",
            type: "quiz",
            question:
              'What will be the output of the following code?\n\nclass Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f"Hello, my name is {self.name}"\n\np = Person("Alice")\nprint(p.greet())',
            options: [
              { id: "a", text: "Hello, my name is Person", isCorrect: false },
              {
                id: "b",
                text: "Hello, my name is self.name",
                isCorrect: false,
              },
              { id: "c", text: "Hello, my name is Alice", isCorrect: true },
              { id: "d", text: "Error", isCorrect: false },
            ],
            explanation:
              'We create a Person object with the name "Alice". When we call p.greet(), the greet method uses self.name, which refers to the name attribute of the p object. Since p.name is "Alice", the output is "Hello, my name is Alice".',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-13",
        title: "Basic Code Style and Clean Coding",
        description:
          "Learn how to write clean, readable, and maintainable Python code.",
        isCompleted: false,
        isLocked: true,
        duration: 50,
        contents: [
          {
            id: "1-13-1",
            title: "PEP 8 – Python Style Guide",
            type: "text",
            text: "PEP 8 is Python's official style guide. It provides conventions for writing readable code, including indentation (4 spaces), maximum line length (79 characters), naming conventions, and more. Following PEP 8 makes your code more consistent and easier for others to read and maintain.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-13-2",
            title: "Naming Conventions",
            type: "text",
            text: "Use snake_case for functions and variables (lowercase with underscores), PascalCase for classes (capitalize first letter of each word), and UPPER_CASE for constants. Choose descriptive names that reflect purpose. Avoid single-letter names except for counters or coordinates.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-13-3",
            title: "Writing Readable Code",
            type: "image",
            text: "Readable code is easier to understand, debug, and maintain. Use consistent formatting, meaningful variable names, and appropriate spacing. Break complex operations into simpler steps. Remember that code is read much more often than it's written, so optimize for readability.",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-13-4",
            title: "Commenting and Docstrings",
            type: "text",
            text: 'Comments explain why code does something, not what it does (the code itself should be clear enough). Docstrings are special comments that document functions, classes, and modules. They\'re enclosed in triple quotes (""") and describe purpose, parameters, return values, and examples.',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-13-5",
            title: "Refactoring Tips",
            type: "text",
            text: "Refactoring improves code structure without changing its behavior. Look for repeated code that could be a function, long functions that could be split, or complex expressions that could be simplified. Refactor gradually and test after each change to ensure functionality remains intact.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-13-6",
            title: "Code Style Quiz",
            type: "quiz",
            question:
              "According to PEP 8, which of the following is the correct way to name a variable in Python?",
            options: [
              { id: "a", text: "myVariable", isCorrect: false },
              { id: "b", text: "my_variable", isCorrect: true },
              { id: "c", text: "MyVariable", isCorrect: false },
              { id: "d", text: "MYVARIABLE", isCorrect: false },
            ],
            explanation:
              'PEP 8 recommends using snake_case (lowercase with underscores) for variable names. So "my_variable" is the correct convention. CamelCase (myVariable) is common in other languages but not recommended in Python. PascalCase (MyVariable) is used for class names, and UPPER_CASE is used for constants.',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
      {
        id: "1-14",
        title: "Mini Projects and Practice",
        description:
          "Apply what you've learned by building small Python projects.",
        isCompleted: false,
        isLocked: true,
        duration: 90,
        contents: [
          {
            id: "1-14-1",
            title: "Calculator App (CLI)",
            type: "text",
            text: "Build a command-line calculator that can perform basic arithmetic operations (addition, subtraction, multiplication, division). This project will reinforce your understanding of functions, user input, conditional statements, and error handling. You can extend it with more operations as you learn more.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-14-2",
            title: "To-Do List Manager",
            type: "text",
            text: "Create a to-do list application that allows users to add, view, mark as complete, and delete tasks. This project practices working with lists, loops, and file I/O (to save and load tasks). It's a practical application that you might actually use yourself!",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-14-3",
            title: "Number Guessing Game",
            type: "image",
            text: 'Develop a game where the computer picks a random number and the player tries to guess it. The computer gives hints ("higher" or "lower") until the player guesses correctly. This project uses random number generation, loops, conditionals, and user input.',
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-14-4",
            title: "Basic Contact Book",
            type: "text",
            text: "Build a simple contact management system using dictionaries. Users can add contacts with names, phone numbers, and emails, search for contacts, update information, and delete contacts. This project reinforces dictionary operations, user input validation, and menu-driven interfaces.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-14-5",
            title: "Rock Paper Scissors Game",
            type: "text",
            text: "Create the classic Rock Paper Scissors game where the player competes against the computer. Keep track of wins, losses, and ties. This project uses random choices, conditionals, loops, and possibly functions to organize the game logic. It's a fun way to practice several Python concepts together.",
            isCompleted: false,
            isLocked: true,
          },
          {
            id: "1-14-6",
            title: "Mini Projects Quiz",
            type: "quiz",
            question:
              "Which Python module would be most useful for creating a Number Guessing Game?",
            options: [
              { id: "a", text: "math", isCorrect: false },
              { id: "b", text: "random", isCorrect: true },
              { id: "c", text: "datetime", isCorrect: false },
              { id: "d", text: "os", isCorrect: false },
            ],
            explanation:
              "The random module would be most useful for a Number Guessing Game because you need to generate a random number for the player to guess. The random.randint() function can generate a random integer within a specified range, which is perfect for this game.",
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
    ],
    achievements: [
      {
        id: "a1",
        title: "Python Beginner",
        description: "Complete your first Python lesson",
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
        isEarned: true,
      },
      {
        id: "a2",
        title: "Code Explorer",
        description: "Complete 5 lessons in the Python course",
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
        isEarned: false,
      },
      {
        id: "a3",
        title: "Quiz Master",
        description: "Score 100% on all quizzes in the course",
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
        isEarned: false,
      },
      {
        id: "a4",
        title: "Project Builder",
        description: "Complete all mini projects in the course",
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
        isEarned: false,
      },
      {
        id: "a5",
        title: "Python Graduate",
        description: "Complete the entire Python for Absolute Beginners course",
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp",
        isEarned: false,
      },
    ],
  },
];

// User progress data
export const userProgress: UserProgress = {
  userId: "user1",
  enrolledCourses: [
    {
      courseId: "1",
      lastAccessedDate: new Date("2023-04-15"),
      completedLessons: ["1-1"],
      completedContents: ["1-1-1", "1-1-2", "1-1-3", "1-1-4"],
      earnedAchievements: ["a1"],
      earnedGems: 15,
    },
  ],
  streak: {
    currentStreak: 5,
    lastLoginDate: new Date(),
    highestStreak: 12,
  },
  totalGems: 30,
  earnedBadges: ["python_beginner", "quick_learner"],
};

// Helper functions
export const calculateCourseProgress = (courseId: string): number => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return 0;

  const userCourseProgress = userProgress.enrolledCourses.find(
    (c) => c.courseId === courseId
  );
  if (!userCourseProgress) return 0;

  const totalContents = course.lessons.reduce(
    (sum, lesson) => sum + lesson.contents.length,
    0
  );
  const completedContents = userCourseProgress.completedContents.length;

  return Math.round((completedContents / totalContents) * 100);
};

export const getTrendingCourses = (): Course[] => {
  return courses.filter((course) => course.isTrending).slice(0, 3);
};

export const getEnrolledCourses = (): Course[] => {
  return courses.filter((course) => course.isEnrolled);
};

export const getUnenrolledCourses = (): Course[] => {
  return courses.filter((course) => !course.isEnrolled);
};

export const markContentAsCompleted = (
  courseId: string,
  contentId: string
): void => {
  const courseIndex = courses.findIndex((c) => c.id === courseId);
  if (courseIndex === -1) return;

  let contentFound = false;

  // Find and mark the content as completed
  for (const lesson of courses[courseIndex].lessons) {
    const contentIndex = lesson.contents.findIndex((c) => c.id === contentId);
    if (contentIndex !== -1) {
      courses[courseIndex].lessons.find((l) => l.id === lesson.id)!.contents[
        contentIndex
      ].isCompleted = true;
      contentFound = true;

      // Add to user progress
      const userCourseIndex = userProgress.enrolledCourses.findIndex(
        (c) => c.courseId === courseId
      );
      if (
        userCourseIndex !== -1 &&
        !userProgress.enrolledCourses[
          userCourseIndex
        ].completedContents.includes(contentId)
      ) {
        userProgress.enrolledCourses[userCourseIndex].completedContents.push(
          contentId
        );
      }

      // Unlock next content if available
      const nextContentIndex = contentIndex + 1;
      if (nextContentIndex < lesson.contents.length) {
        courses[courseIndex].lessons.find((l) => l.id === lesson.id)!.contents[
          nextContentIndex
        ].isLocked = false;
      } else {
        // If this was the last content, mark lesson as completed
        courses[courseIndex].lessons.find(
          (l) => l.id === lesson.id
        )!.isCompleted = true;

        // Add to user progress
        if (
          userCourseIndex !== -1 &&
          !userProgress.enrolledCourses[
            userCourseIndex
          ].completedLessons.includes(lesson.id)
        ) {
          userProgress.enrolledCourses[userCourseIndex].completedLessons.push(
            lesson.id
          );
        }

        // Unlock next lesson if available
        const lessonIndex = courses[courseIndex].lessons.findIndex(
          (l) => l.id === lesson.id
        );
        const nextLessonIndex = lessonIndex + 1;
        if (nextLessonIndex < courses[courseIndex].lessons.length) {
          courses[courseIndex].lessons[nextLessonIndex].isLocked = false;
        }
      }

      break;
    }
  }

  if (contentFound) {
    // Update course progress
    courses[courseIndex].progress = calculateCourseProgress(courseId);
  }
};

export const awardGems = (amount: number): void => {
  userProgress.totalGems += amount;
};

export const updateStreak = (): void => {
  const today = new Date();
  const lastLogin = new Date(userProgress.streak.lastLoginDate);

  // Check if last login was yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    lastLogin.getFullYear() === yesterday.getFullYear() &&
    lastLogin.getMonth() === yesterday.getMonth() &&
    lastLogin.getDate() === yesterday.getDate()
  ) {
    userProgress.streak.currentStreak += 1;
    if (userProgress.streak.currentStreak > userProgress.streak.highestStreak) {
      userProgress.streak.highestStreak = userProgress.streak.currentStreak;
    }
  } else if (
    lastLogin.getFullYear() !== today.getFullYear() ||
    lastLogin.getMonth() !== today.getMonth() ||
    lastLogin.getDate() !== today.getDate()
  ) {
    // If not yesterday and not today, reset streak
    if (
      lastLogin.getFullYear() !== today.getFullYear() ||
      lastLogin.getMonth() !== today.getMonth() ||
      lastLogin.getDate() !== today.getDate()
    ) {
      userProgress.streak.currentStreak = 1;
    }
  }

  userProgress.streak.lastLoginDate = today;
};

export const getStreakReward = (): number => {
  // Base reward is 5 gems
  let reward = 5;

  // Bonus for streaks
  if (userProgress.streak.currentStreak >= 7) {
    reward += 5; // +5 for 7+ days
  }
  if (userProgress.streak.currentStreak >= 30) {
    reward += 15; // +15 more for 30+ days
  }

  return reward;
};

export const enrollInCourse = (courseId: string): void => {
  const courseIndex = courses.findIndex((c) => c.id === courseId);
  if (courseIndex === -1) return;

  courses[courseIndex].isEnrolled = true;
  courses[courseIndex].progress = 0;

  // Unlock first lesson and its first content
  if (courses[courseIndex].lessons.length > 0) {
    courses[courseIndex].lessons[0].isLocked = false;
    if (courses[courseIndex].lessons[0].contents.length > 0) {
      courses[courseIndex].lessons[0].contents[0].isLocked = false;
    }
  }

  // Add to user progress
  userProgress.enrolledCourses.push({
    courseId,
    lastAccessedDate: new Date(),
    completedLessons: [],
    completedContents: [],
    earnedAchievements: [],
    earnedGems: 0,
  });
};
