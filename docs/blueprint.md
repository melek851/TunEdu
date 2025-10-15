# **App Name**: TunEdu

## Core Features:

- User Authentication: Implement secure sign-up, sign-in, and logout functionality for students and admins using Django's built-in authentication.
- Curriculum Browsing: Enable users to browse the curriculum by level (Primaire, Collège, Lycée), class year, and subject.
- Subject Manuals: Allow admins to upload subject manuals (PDFs) and provide students with in-browser previews and download options.
- Lesson Management: Enable admins to create and manage lessons, including recorded sessions (YouTube/Vimeo/MP4 URLs), exercises (PDF/image/markdown file uploads), and associated resources.
- Lesson Interactions: Implement upvote/downvote functionality for lessons, along with a simple commenting system.
- Student Dashboard: Provide a student dashboard displaying quick stats such as the number of lessons viewed, exercises opened, and time spent learning.
- AI Assistant Placeholder: Implement a placeholder AI assistant panel with a text box and a canned response for each subject. The LLM should function as a tool by choosing when to give canned responses. Provide a stub backend endpoint returning a canned JSON response.

## Style Guidelines:

- Primary color: Vivid blue (#29ABE2) to convey trust, knowledge and innovation. A fitting hue for an educational application.
- Background color: Light gray (#F0F4F7), providing a neutral backdrop that's easy on the eyes, allowing content to stand out, for optimal readability and a modern aesthetic.
- Accent color: Bright orange (#FF8C42), complementing the blue and adds a burst of energy to key interactive elements, ensuring important functions grab user attention and boost the overall engagement.
- Headline font: 'Space Grotesk' sans-serif font, suitable for headlines and shorter chunks of text; body font: 'Inter' sans-serif font for body text
- Use clear and modern icons from a library like FontAwesome or Material Design to represent different content types and actions.
- Implement a clean, responsive layout using TailwindCSS grid and flexbox utilities, ensuring optimal viewing experience across devices.
- Use subtle transitions and animations to provide feedback and enhance the user experience, such as highlighting interactive elements on hover.