import React, { createContext, ReactNode, useContext } from "react"

type Metadata = {
  isBlogPost: boolean
}

type Props = Readonly<{
  children: ReactNode
  value?: Metadata
}>

const metadata: Metadata = {
  isBlogPost: false,
}

const MetadataContext = createContext(metadata)

const useMetadataContext = () => useContext(MetadataContext)

export const MetadataContextProvider = ({ children, value }: Props) => (
  <MetadataContext.Provider value={value ?? metadata}>
    {children}
  </MetadataContext.Provider>
)

export default useMetadataContext
