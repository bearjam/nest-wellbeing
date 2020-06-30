module.exports = {
  siteMetadata: {
    title: `Nest Wellbeing`,
    description: `Mum and baby wellbeing in Bearwood and Beyond`,
    seo: {
      ogp: {
        image: `/images/twitter-fb-card.png`,
      },
      twitter: {
        image: `/images/twitter-fb-card.png`,
      },
    },
    siteUrl: `https://nestwellbeing.com`,
  },
  plugins: [
    // `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/data/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `svgs`,
        path: `${__dirname}/src/data/svgs`,
      },
    },
    `gatsby-transformer-svgo-inline`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: `${__dirname}/src/components/Layout.js`,
      },
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        // dimensions: false
        icon: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/data/pages`,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-plugin-svgr`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nest Wellbeing`,
        short_name: `Nest Wellbeing`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#2c7a7b`,
        display: `minimal-ui`,
        icon: `src/data/svgs/favicon2.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
