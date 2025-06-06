import type { Preview } from '@storybook/react';
import { withRouter } from '../src/stories/decorators/withRouter';
import { withStore } from '../src/stories/decorators/withStore';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withStore, withRouter],
};

export default preview;
