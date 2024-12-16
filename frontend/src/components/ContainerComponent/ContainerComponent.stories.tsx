import { Meta, StoryFn } from '@storybook/react'
import {
  ContainerComponent,
  ContainerHeader,
  ContainerBody,
} from './ContainerComponent'
import { ReactNode } from 'react'

export default {
  title: 'Components/Container',
  component: ContainerComponent,
} as Meta

interface StoryProps {
  title?: string
  children: ReactNode
  withBg: boolean
  isScrolling?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const Template: StoryFn<StoryProps> = ({
  title,
  children,
  withBg,
  isScrolling = false,
  orientation = 'vertical',
}) => (
  <ContainerComponent title={title} withBg={withBg}>
    <ContainerHeader>
      <div>Header Content</div>
    </ContainerHeader>
    <ContainerBody isScrolling={isScrolling} orientation={orientation}>
      {children}
    </ContainerBody>
  </ContainerComponent>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Default Container',
  children: <div>Default container content</div>,
  withBg: true,
}

export const NoBackground = Template.bind({})
NoBackground.args = {
  title: 'Container without Background',
  children: <div>Content without background</div>,
  withBg: false,
}

export const WithScrollingVertical = Template.bind({})
WithScrollingVertical.args = {
  title: 'Scrollable Container (Vertical)',
  children: (
    <div style={{ height: '400px' }}>
      <p>Scrollable content with vertical scrolling</p>
    </div>
  ),
  withBg: true,
  isScrolling: true,
  orientation: 'vertical',
}

export const WithScrollingHorizontal = Template.bind({})
WithScrollingHorizontal.args = {
  title: 'Scrollable Container (Horizontal)',
  children: (
    <div style={{ width: '600px' }}>
      <p>Scrollable content with horizontal scrolling</p>
    </div>
  ),
  withBg: true,
  isScrolling: true,
  orientation: 'horizontal',
}

export const WithoutTitle = Template.bind({})
WithoutTitle.args = {
  title: undefined,
  children: <div>Container without title</div>,
  withBg: true,
}
