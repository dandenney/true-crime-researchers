import { graphql } from "gatsby"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import statusColor from "helpers/statusColor"

import Audios from "components/audios"
import CTA from "components/cta"
import Events from "components/events"
import Layout from "components/layout"
import Persons from "components/persons"
import Places from "components/places"
import Social from "components/social"
import Suspects from "components/suspects"
import SEO from "components/seo"
import Texts from "components/texts"
import Victims from "components/victims"
import Videos from "components/videos"
import RelatedCases from "../components/related-cases"

const CasesTemplate = ({ data }) => {
  const {
    audio,
    category,
    centerLat,
    centerLong,
    ctaText,
    ctaUrl,
    ctaUrlText,
    ctaPhone,
    events,
    persons,
    places,
    relatedCases,
    socialEmbeds,
    status,
    suspects,
    summary,
    texts,
    title,
    victims,
    videos,
    zoom,
  } = data.allAirtable.nodes[0].data.Cases[0].data

  return (
    <Layout>
      <SEO title="Home" />
      <main>
        <section
          sx={{
            px: [16, 16, 24],
          }}
        >
          <div
            sx={{
              textAlign: "center",
            }}
          >
            <span
              sx={{
                display: "block",
                fontSize: [
                  "calc(2vw + 2vh + 7vmin)",
                  null,
                  null,
                  null,
                  "calc(2vw + 2vh + 18vmin)",
                  "calc(2vw + 2vh + 21vmin)",
                  null,
                  "calc(2vw + 2vh + 26vmin)",
                  "calc(2vw + 2vh + 28vmin)",
                ],
                fontWeight: 2,
                lineHeight: "0.8",
                mb: 0,
                mt: 16,
                position: "relative",
                textTransform: "uppercase",
              }}
            >
              {category}
              <div
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  sx={{
                    fontSize: [
                      "16px",
                      "16px",
                      "16px",
                      "calc(1vw + 1vh + .5vmin)",
                    ],
                    fontWeight: 1,
                    px: [2, 2, 2, 6],
                    py: [4, 4, 4, 8],
                  }}
                >
                  <span sx={{ color: "mute" }}>Status: </span>
                  <span sx={{ color: statusColor(status) }}>{status}</span>
                </span>
              </div>
            </span>
          </div>

          {victims && <Victims victims={victims} />}

          <Styled.h1
            sx={{
              mb: 16,
            }}
          >
            {title}
          </Styled.h1>
          <p sx={{ mx: "auto", my: "0", maxWidth: "900px" }}>{summary}</p>
        </section>

        {status !== "Closed" && ctaText && (
          <CTA
            ctaPhone={ctaPhone}
            ctaText={ctaText}
            ctaUrl={ctaUrl}
            ctaUrlText={ctaUrlText}
            status={status}
          />
        )}

        {suspects && <Suspects suspects={suspects} status={status} />}

        {events && <Events events={events} />}

        {places && (
          <Places
            centerLat={centerLat}
            centerLong={centerLong}
            places={places}
            zoom={zoom}
          />
        )}

        {persons && <Persons persons={persons} />}

        {videos && <Videos videos={videos} />}

        {audio && <Audios audios={audio} />}

        {texts && <Texts texts={texts} />}

        {socialEmbeds && <Social socialEmbeds={socialEmbeds} />}

        {relatedCases && <RelatedCases relatedCases={relatedCases} />}
      </main>
    </Layout>
  )
}

export const query = graphql`
  query casePageQuery($slug: String!) {
    allAirtable(
      filter: {
        data: { Cases: { elemMatch: { data: { Slug: { eq: $slug } } } } }
      }
      sort: { fields: data___Places___data___Label }
    ) {
      nodes {
        data {
          Cases {
            data {
              category: Category
              centerLat: Center_Latitude
              centerLong: Center_Longitude
              facebookImage: Facebook_Image {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              instagramImage: Instagram_Image {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 540) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              instagramStoryImage: Instagram_Story_Image {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 540) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              status: Status
              summary: Summary
              ctaText: CTA_Text
              ctaUrl: CTA_Url
              ctaUrlText: CTA_Url_Text
              ctaPhone: CTA_Phone
              title: Title
              titleShort: Title_Short
              twitterImage: Twitter_Image {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 440) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              zoom: Zoom
              audio: Audio {
                data {
                  itunes: iTunes
                  thumbnail: Thumbnail {
                    localFiles {
                      childImageSharp {
                        fixed(width: 200) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                  }
                  runtime: Runtime__in_minutes_
                  source: Source
                  stitcher: Stitcher
                  title: Title
                  url: URL
                }
              }
              events: Events {
                data {
                  date: Date(formatString: "MMMM DD, YYYY")
                  description: Description
                  order: Order
                  time: Time(formatString: "hh:mm a")
                  title: Title
                }
              }
              persons: Persons_of_Interest {
                data {
                  description: Description
                  name: Name
                  personPhoto: Person_Photo {
                    localFiles {
                      childImageSharp {
                        fixed(width: 200) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                  }
                }
              }
              places: Places {
                data {
                  description: Description
                  label: Label
                  latitude: Latitude
                  longitude: Longitude
                  order: Order
                  title: Title
                }
              }
              relatedCases: Related_Cases {
                data {
                  slug: Slug
                  title: Title
                }
              }
              socialEmbeds: Social_Embeds {
                data {
                  height: Height
                  source: Source
                  url: URL
                  width: Width
                }
              }
              suspects: Suspects {
                data {
                  name: Name
                  description: Description
                  ethnicity: Ethnicity
                  sex: Sex
                  heightInFeet: Height_in_feet
                  heightInInches: Height_in_inches
                  weight: Weight
                  hairColor: Hair_Color
                  eyeColor: Eye_Color
                  dateOfBirth: Date_of_Birth
                  suspectPhoto: Suspect_Photo {
                    localFiles {
                      childImageSharp {
                        fixed(width: 260) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                  }
                }
              }
              texts: Texts {
                data {
                  sourceName: Source_Name
                  title: Title
                  type: Type
                  url: URL
                }
              }
              victims: Victims {
                data {
                  age: Age_At_Time_Of_Event
                  dateOfBirth: Date_of_Birth(formatString: "MMMM DD, YYYY")
                  discovered: Discovered(formatString: "MMMM DD, YYYY")
                  description: Description
                  ethnicity: Ethnicity
                  eyeColor: Eye_Color
                  firstName: First_Name
                  hairColor: Hair_Color
                  heightInFeet: Height_in_feet
                  heightInInches: Height_in_inches
                  lastName: Last_Name
                  lastSeen: Last_Seen(formatString: "MMMM DD, YYYY")
                  middleName: Middle_Name
                  nationality: Nationality
                  namusCase: NamUs_Case
                  namusURL: NamUs_URL
                  sex: Sex
                  type: Type
                  weight: Weight
                  photo: Photo {
                    localFiles {
                      childImageSharp {
                        fixed(width: 310) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                  }
                }
              }
              videos: Videos {
                data {
                  description: Description
                  source: Source
                  title: Title
                  url: URL
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CasesTemplate
