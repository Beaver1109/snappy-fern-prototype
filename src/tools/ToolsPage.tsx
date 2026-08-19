import {
  DexBox,
  DexStack,
  DexInline,
  DexText,
  DexCard,
  DexIcon,
  DexButton,
} from '@thryvlabs/dex-react';

const TOOLS = [
  {
    icon: 'lightbulb',
    title: 'Solution LaunchPad',
    description: 'Configure & launch packaged solutions.',
    url: 'https://share.keap.app/shared/bundles',
  },
  {
    icon: 'check',
    title: 'Coaching Portal',
    description: 'Onboard and assist your clients with customized checklists and strategic goals.',
    url: 'https://plays.keap.app/coach',
  },
  {
    icon: 'book-open',
    title: 'Knowledge Base',
    description: 'How-tos, integration guides, and more.',
    url: 'https://learn.thryv.com/hc/en-us',
  },
  {
    icon: 'code',
    title: 'API Documentation',
    description: 'Guides, references and examples for building with our API.',
    url: 'https://developer.keap.com/docs/restv2/',
  },
  {
    icon: 'users',
    title: 'Partner Portal',
    description: 'Partner Hub is about providing tools to help the partner support their customers.',
    url: 'https://infusionsoft.my.site.com/Partners/login?locale=us',
  },
];

export function ToolsPage() {
  return (
    <DexBox paddingX="300" paddingY="200">
      <DexStack gap="300">
        <DexStack gap="050">
          <DexText variant="display-2">Partner tools</DexText>
          <DexText color="subtle" variant="body-2">
            Access your partner tools from here. Configure solutions, onboard your clients, explore integrations, and more.
          </DexText>
        </DexStack>

        <DexInline gap="200" wrap>
          {TOOLS.map((tool) => (
            <DexCard key={tool.title} elevation="subtle" style={{ width: '100%', maxWidth: '23.5rem' }}>
              <DexBox padding="200">
                <DexStack gap="100">
                  <DexStack gap="050">
                    <DexInline alignX="spread" alignY="center" stretch>
                      <DexText variant="headline-4">{tool.title}</DexText>
                      <DexIcon name={tool.icon} size="sm" color="primary" />
                    </DexInline>
                    <DexText color="subtle" variant="body-2" style={{ minHeight: '4rem' }}>
                      {tool.description}
                    </DexText>
                  </DexStack>

                  <DexInline alignX="end" stretch>
                    <DexButton
                      as="a"
                      href={tool.url}
                      color="neutral"
                      trailingIcon="external-link"
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="outline"
                      size="dense"
                    >
                      Open
                    </DexButton>
                  </DexInline>
                </DexStack>
              </DexBox>
            </DexCard>
          ))}
        </DexInline>
      </DexStack>
    </DexBox>
  );
}
