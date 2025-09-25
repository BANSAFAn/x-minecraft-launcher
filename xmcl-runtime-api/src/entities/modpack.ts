/* eslint-disable camelcase */

// Defining a minimal Modpack entity to satisfy no-empty-file rule and provide future extension point
export interface ModpackManifestEntry {
  path: string
  sha1?: string
  size?: number
}

export interface ModpackManifest {
  name: string
  version: string
  files: ModpackManifestEntry[]
}

export type ModpackId = string

export const enum ModpackSource {
  CurseForge = 'curseforge',
  Modrinth = 'modrinth',
  Local = 'local',
}

export interface ModpackMeta {
  id: ModpackId
  source: ModpackSource
  title?: string
  author?: string
  description?: string
}

export default {} as any