import React, {FC, useCallback} from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import {resolve, track} from 'api'
import { TagsInputField } from "components/TagsInputField";
import { Button, TextField } from "@material-ui/core";
import {useMutation} from "react-query";

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  permalink: Yup.string().min(5).test('dupe', 'Not available', async (value) => {
    try {
      await resolve(value)
      return false
    } catch {
      return true
    }
  }).required('Required'),
  tags: Yup.array().required('Required'),
  description: Yup.string().required('Required'),
})

type Props = { id: string }

export const TrackDetails: FC<Props> = ({ id }) => {
  const [mutate] = useMutation(track)
  const handleSubmit = useCallback(async (track) => {
    console.log('asdf', id)
    await mutate({
      id,
      ...track
    })
    console.log('Saved!')
  }, [id])

  const formik = useFormik({
    initialValues: {
      title: '',
      permalink: '',
      tags: [],
      description: '',
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <br/><br/>
        <TextField
          fullWidth
          id="permalink"
          name="permalink"
          label="Permalink"
          value={formik.values.permalink}
          onChange={formik.handleChange}
          error={formik.touched.permalink && Boolean(formik.errors.permalink)}
          helperText={formik.touched.permalink && formik.errors.permalink}
        />
        <br/><br/>
        <TagsInputField
          fullWidth
          id="tags"
          name="tags"
          label="Tags"
          onChange={(tags: string[]) => formik.setFieldValue('tags', tags)}
          value={formik.values.tags}
          error={formik.touched.tags && Boolean(formik.errors.tags)}
          helperText={formik.touched.tags && formik.errors.tags}
        />
        <br/><br/>
        <TextField
          fullWidth
          multiline
          id="description"
          name="description"
          label="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <br/><br/>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
