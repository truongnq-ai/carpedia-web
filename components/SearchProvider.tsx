'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Dialog, DialogPanel, Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, Transition, TransitionChild } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { SearchResult } from '@/lib/search'

interface SearchContextType {
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within a SearchProvider')
  return context
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load search index
    fetch('/search.json')
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error('Failed to load search index', err))
  }, [])

  useEffect(() => {
     // Keyboard shortcut
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (query === '') {
      setFilteredResults([])
    } else {
      setFilteredResults(
        results.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5) // Limit to 5 results
      )
    }
  }, [query, results])

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => {
    setIsOpen(false)
    setQuery('')
  }

  const handleSelect = (item: SearchResult) => {
    closeSearch()
    router.push(item.url)
  }

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch }}>
      {children}
      <Transition show={isOpen} as="div" appear>
        <Dialog onClose={closeSearch} className="relative z-50">
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
             <div className="fixed inset-0 bg-gray-500/25 backdrop-blur-sm transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:bg-gray-800 dark:ring-white/10">
                <Combobox onChange={(item: SearchResult) => handleSelect(item)}>
                  <div className="relative">
                    <ComboboxInput
                      className="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:text-gray-100"
                      placeholder="Tìm kiếm hãng xe, quốc gia..."
                      onChange={(event) => setQuery(event.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  {filteredResults.length > 0 && (
                    <ComboboxOptions static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-200">
                      {filteredResults.map((item) => (
                        <ComboboxOption
                          key={item.url}
                          value={item}
                          className={({ active }) =>
                            `cursor-default select-none px-4 py-2 ${
                              active ? 'bg-indigo-600 text-white' : ''
                            }`
                          }
                        >
                          {item.name}
                          <span className="ml-2 text-xs opacity-70">({item.type})</span>
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  )}

                  {query !== '' && filteredResults.length === 0 && (
                    <p className="p-4 text-sm text-gray-500">Không tìm thấy kết quả.</p>
                  )}
                </Combobox>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </SearchContext.Provider>
  )
}
