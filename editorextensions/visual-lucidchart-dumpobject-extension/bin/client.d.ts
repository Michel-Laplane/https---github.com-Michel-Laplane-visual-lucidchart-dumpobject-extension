import { EditorClient, isString, isNumber } from "lucid-extension-sdk";
export type LucidFolder = {
    id: number;
    type: string;
    name: string;
    created: Date;
    parent?: number;
    trashed?: Date;
};
export declare const isSerializedFolder: (subject: unknown) => subject is import("lucid-extension-sdk").DestructureGuardedTypeObj<{
    id: typeof isNumber;
    type: typeof isString;
    name: typeof isString;
    parent: (x: unknown) => x is number | (null | undefined);
    created: typeof isString;
    trashed: (x: unknown) => x is string | (null | undefined);
}>;
export type LucidDocument = {
    documentId: number;
    title: string;
    editUrl: string;
    viewUrl: string;
    version: string;
    pageCount: string;
    canEdit: string;
    created: string;
    CreatorId: string;
    lastModified: string;
    CustomTags: string;
    Product: string;
    status: string;
    parent: string;
};
export declare const isSerializedFolderList: (p1: unknown) => p1 is import("lucid-extension-sdk").DestructureGuardedTypeObj<{
    id: typeof isNumber;
    type: typeof isString;
    name: typeof isString;
    parent: (x: unknown) => x is number | (null | undefined);
    created: typeof isString;
    trashed: (x: unknown) => x is string | (null | undefined);
}>[];
export declare function getLucidFolders(client: EditorClient): Promise<LucidFolder[]>;
export declare function getLucidDocuments(client: EditorClient): Promise<LucidDocument[]>;
export declare function getDocumentInfo(docID: string): Promise<{
    docID: string;
    pages: null;
    state: null;
}>;
