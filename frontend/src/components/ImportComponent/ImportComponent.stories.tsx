import { Meta, StoryFn } from '@storybook/react'
import { ImportComponent } from './ImportComponent'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/i18n'

export default {
  title: 'Components/ImportComponent',
  component: ImportComponent,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
} as Meta

const Template: StoryFn = (args) => <ImportComponent {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithFiles = Template.bind({})
WithFiles.args = {}
WithFiles.play = async ({ canvasElement }) => {
  const button = canvasElement.querySelector('button')
  button?.click()

  const fileUploader = canvasElement.querySelector('input[type="file"]')
  const file = new File(['file content'], 'example.xlsx', {
    type: 'xlsx/plain',
  })

  Object.defineProperty(fileUploader, 'files', { value: [file, file, file] })
  fileUploader?.dispatchEvent(new Event('change', { bubbles: true }))
}
