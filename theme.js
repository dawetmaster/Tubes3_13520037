import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    fonts: {
        body: "Ubuntu, system-ui, sans-serif",
        heading: "Ubuntu, system-ui, sans-serif",
        mono: "Menlo, monospace",
    },
})

export default theme;