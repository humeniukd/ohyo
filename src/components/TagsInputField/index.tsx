import React, {FC, KeyboardEvent, ChangeEvent, useCallback, useMemo, useState, useEffect} from 'react'
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { useTagsSuggestions } from 'hooks/api'
import { useIsMounted } from 'hooks'
import { KeyboardKey } from 'utils'
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

const MIN_LEN = 3

export type TagsInputProps = {
  onChange: (val: string[]) => void
} & Omit<TextFieldProps, 'onChange'>

export const TagsInputField: FC<TagsInputProps> = ({
  onChange,
  ...rest
}) => {
  const { current: isMounted } = useIsMounted()
  const [value, setValue] = useState('')
  const [search, suggestions] = useTagsSuggestions()
  const [tags, setTags] = useState<string[]>([])
  const [anchor, setAnchorEl] = useState(null)

  const handleInputKeyDown = (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    const tag = e.target.value
    if (e.key === KeyboardKey.Enter && tag.length >= MIN_LEN) {
      addTag(tag)
    }
  }

  const handleSearchChange = useCallback((e) => {
      const searchValue = e.target.value
      setValue(searchValue)
      if (searchValue.length >= MIN_LEN) {
        suggestions?.length && setAnchorEl(e.currentTarget)
        search(searchValue)

      }
    },
    [search, suggestions],
  )

  const addTag = useCallback(tag => {
      !tags.includes(tag) && setTags([...tags, tag])
      setAnchorEl(null)
      setValue('')
  }, [tags])

  const removeTag = useCallback((tag) => {
    setTags(tags.filter(t => t !== tag))
  }, [tags])

  const renderOptions = useMemo(() => suggestions &&
    suggestions.map(tag =>
      <MenuItem onClick={_ => addTag(tag.text)} key={tag.text}>
        {tag.text}
      </MenuItem>
  ), [suggestions, addTag])

  const renderTags = useMemo(() => tags.map(tag =>
    <Chip key={tag} label={tag} onDelete={_ => removeTag(tag)} />
  ), [tags, removeTag])

  useEffect(function () {
    isMounted && onChange(tags)
  }, [tags, isMounted])

  return <>
    <TextField
      {...rest}
      InputProps={{
        startAdornment: <Box display="flex" justifyContent="center">{renderTags}</Box>
      }}
      onKeyDown={handleInputKeyDown}
      onChange={handleSearchChange}
      value={value}
    />
    <Menu open={Boolean(anchor)} anchorEl={anchor}>
      {renderOptions}
    </Menu>
  </>
}
