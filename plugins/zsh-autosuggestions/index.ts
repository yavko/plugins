const plugin: Fig.Plugin = {
  name: "zsh-autosuggestions",
  type: "shell",
  description: "Fish-like autosuggestions for zsh",
  icon: "https://avatars.githubusercontent.com/u/567410",
  github: "zsh-users/zsh-autosuggestions",
  license: ["MIT"],
  shells: ["zsh"],
  categories: ["Completion"],
  keywords: [
    "shell",
    "autosuggest",
    "zsh",
    "zsh-autosuggestions",
    "fish",
    "autocomplete",
  ],
  installation: {
    origin: "github",
    sourceFiles: "zsh-autosuggestions.zsh",
  },
  configuration: [
    {
      displayName: "Suggestion Highlight Style",
      type: "environmentVariable",
      description: "Configure the style that the suggestion is shown with.",
      environmentVariable: "ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE",
      default: "fg=8",
      interface: "text",
      additionalDetails: "For more info, read the Character Highlighting section of the zsh manual: `man zshzle` or [online](http://zsh.sourceforge.net/Doc/Release/Zsh-Line-Editor.html#Character-Highlighting)."
    },
    {
      displayName: "Suggestion Strategy",
      type: "environmentVariable",
      description: "Specify how suggestions should be generated. The strategies in the array are tried successively until a suggestion is found.",
      environmentVariable: "ZSH_AUTOSUGGEST_STRATEGY",
      default: "history",
      interface: "multiselect",
      options: [
        "history",
        "completion",
        "match_prev_cmd"
      ],
      additionalDetails: 
      `
      - **history**: Chooses the most recent match from history.
      - **completion**: Chooses a suggestion based on what tab-completion would suggest. (requires zpty module)
      - **match_prev_cmd**: Like *history*, but chooses the most recent match whose preceding history item matches the most recently executed command (more info). Note that this strategy won't work as expected with ZSH options that don't preserve the history order such as \`HIST_IGNORE_ALL_DUPS\` or \`HIST_EXPIRE_DUPS_FIRST\`.
      `
    },
    {
      displayName: "Async",
      type: "environmentVariable",
      description: "Suggestions are fetched asynchronously by default in zsh versions 5.0.8 and greater.",
      environmentVariable: "ZSH_AUTOSUGGEST_USE_ASYNC",
      default: true,
      interface: "toggle"
    },
    {
      displayName: "Disabling suggestion for large buffers",
      type: "environmentVariable",
      description: "By default, autosuggestion will be tried for any buffer size. Recommended value is 20. This can be useful when pasting large amount of text in the terminal, to avoid triggering autosuggestion for strings that are too long.",
      environmentVariable: "ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE",
      default: 20,
      interface: "text",
    },
    {
      displayName: "Ignoring history suggestions that match a pattern",
      type: "environmentVariable",
      description: "A glob pattern to prevent offering suggestions for history entries that match the pattern.",
      environmentVariable: "ZSH_AUTOSUGGEST_HISTORY_IGNORE",
      default: "",
      interface: "text",
      disabled: ({ config }) => {
        const strategy = config["ZSH_AUTOSUGGEST_STRATEGY"] as string[]
        return strategy.includes("match_prev_cmd") || strategy.includes("history")
      },
      additionalDetails:
      `
      **Note:** This only affects the *history* and *match_prev_cmd* suggestion strategies.
      `
    },
    {
      displayName: "Skipping completion suggestions for certain cases",
      type: "environmentVariable",
      description: "A glob pattern to prevent offering completion suggestions when the buffer matches that pattern.",
      environmentVariable: "ZSH_AUTOSUGGEST_COMPLETION_IGNORE",
      default: "",
      interface: "text",
      disabled: ({ config }) => {
        const strategy = config["ZSH_AUTOSUGGEST_STRATEGY"] as string[]
        return strategy.includes("match_prev_cmd") || strategy.includes("history")
      },
      additionalDetails:
      `
      **Note:** This only affects the *completion* suggestion strategies.
      `
    },

    {
      displayName: "Widget Mapping",
      configuration: [
        {
          displayName: "Clear Widgets",
          type: "environmentVariable",
          description: "A comma-separated list of widgets that will clear the suggestion when invoked.",
          environmentVariable: "ZSH_AUTOSUGGEST_CLEAR_WIDGETS",
          default: "",
          interface: "text",
          compile: ({ value }) => {
            return value.split(",").map(v => v.trim())
          },
        },
        {
          displayName: "Accept Widgets",
          type: "environmentVariable",
          description: "A comma-separated list of widgets that will accept the suggestion when invoked.",
          environmentVariable: "ZSH_AUTOSUGGEST_ACCEPT_WIDGETS",
          default: "",
          interface: "text",
          compile: ({ value }) => {
            return value.split(",").map(v => v.trim())
          },
        },
        {
          displayName: "Execute Widgets",
          type: "environmentVariable",
          description: "A comma-separated list of widgets that will execute the suggestion when invoked.",
          environmentVariable: "ZSH_AUTOSUGGEST_EXECUTE_WIDGETS",
          default: "",
          interface: "text",
          compile: ({ value }) => value.split(",").map(v => v.trim()),
        },
        {
          displayName: "Partial Accept Widgets",
          type: "environmentVariable",
          description: "A comma-separated list of widgets that will partially accept the suggestion when invoked.",
          environmentVariable: "ZSH_AUTOSUGGEST_PARTIAL_ACCEPT_WIDGETS",
          default: "",
          interface: "text",
          compile: ({ value }) => value.split(",").map(v => v.trim()),
        },
        {
          displayName: "Ignore Widgets",
          type: "environmentVariable",
          description: "A comma-separated list of widgets that will not trigger any custom behavior.",
          environmentVariable: "ZSH_AUTOSUGGEST_IGNORE_WIDGETS",
          default: "",
          interface: "text",
          compile: ({ value }) => {
            return value.split(",").map(v => v.trim())
          },
        },
      ],
      additionalDetails: "Note: A widget shouldn't belong to more than one of the above arrays."
    }
  ]
};

export default plugin;
