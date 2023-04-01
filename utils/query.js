export const LandingPageQuery = `
query LandingPage {
  landingPage {
    data {
      attributes {
        title
        slug
        heroSection {
          heroText
          heroImage {
            ...MediaAttributes
          }
        }
        heroMockup {
          ...MediaAttributes
        }
        aboutHeading
        infoSection {
          infoText {
            richText
          }
          mockup {
            image {
              ...MediaAttributes
            }
          }
        }
        featureHeading
        featureSection {
          checkIcon {
            icon
          }
          featureText
        }
        videoHeading
        video
        accordion {
          accordionHeading
          accordionItem {
            id
            itemHeading
            itemContent
          }
        }
      }
    }
  }
}
fragment MediaAttributes on UploadFileEntityResponse {
  data {
    attributes {
      url
      alternativeText
    }
  }
}
`;
