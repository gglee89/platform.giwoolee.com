/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OMDB_API_URL: string
    readonly VITE_OMDB_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module "*.svg" {
    import * as React from "react"
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >
    const src: string
    export default src
}
