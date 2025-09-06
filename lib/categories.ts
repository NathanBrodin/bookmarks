export type Category = {
  label: string
  value: string
  classlabel: string
}

export const categories: Category[] = [
  {
    label: "Inspirations",
    value: "Inspirations",
    classlabel:
      "border-purple-300 bg-purple-200/10 text-purple-900 dark:border-purple-400/15 dark:bg-purple-800/5 dark:text-purple-200",
  },
  {
    label: "Registries",
    value: "registries",
    classlabel:
      "border-blue-300 bg-blue-200/10 text-blue-900 dark:border-blue-400/15 dark:bg-blue-800/5 dark:text-blue-200",
  },
  {
    label: "Portfolios",
    value: "portfolios",
    classlabel:
      "border-cyan-300 bg-cyan-200/10 text-cyan-900 dark:border-cyan-400/15 dark:bg-cyan-800/5 dark:text-cyan-200",
  },
  {
    label: "Tools",
    value: "Tools",
    classlabel:
      "border-orange-300 bg-orange-200/10 text-orange-900 dark:border-orange-400/15 dark:bg-orange-800/5 dark:text-orange-200",
  },
  {
    label: "Articles",
    value: "Articles",
    classlabel:
      "border-green-300 bg-green-200/10 text-green-900 dark:border-green-400/15 dark:bg-green-800/5 dark:text-green-200",
  },
  {
    label: "Services",
    value: "Services",
    classlabel:
      "border-teal-300 bg-teal-200/10 text-teal-900 dark:border-teal-400/15 dark:bg-teal-800/5 dark:text-teal-200",
  },
  {
    label: "Templates",
    value: "templates",
    classlabel:
      "border-fuchsia-300 bg-fuchsia-200/10 text-fuchsia-900 dark:border-fuchsia-400/15 dark:bg-fuchsia-800/5 dark:text-fuchsia-200",
  },
  {
    label: "My Stuff",
    value: "my-stuff",
    classlabel:
      "border-yellow-300 bg-yellow-200/10 text-yellow-900 dark:border-yellow-400/15 dark:bg-yellow-800/5 dark:text-yellow-200",
  },
  {
    label: "Others",
    value: "Others",
    classlabel:
      "border-gray-300 bg-gray-200/10 text-gray-900 dark:border-gray-400/15 dark:bg-gray-800/5 dark:text-gray-200",
  },
]
