# species-project


# **Topic:** Plant and Fungi Global Biodiversity 


**Goal:** Build a dashboard to display the location of different plants and fungi around the world.

![](Images/plantae.png)
 
# **Data Sources and Tools Used** 

Plant API: https://docs.trefle.io/docs/examples/snippets

Fungi dataset: https://springernature.figshare.com/collections/GlobalFungi_Global_database_of_fungal_records_from_high-throughput-sequencing_metabarcoding_studies/4915392

Tools: Python (ELT), SQLite, HTML, CSS, Flask, JavaScript, Choropleth (Leaflet and MapBox)


# **Data Collection Process:** 

We collected our plant data using the Trefle API and extracted species count by region (lat and lon). Due to the large amount of data, we had to download several individual JSONs and load them into SQLite. Our fungi data was exracted using a CSV.


# **Visualizations:**

**Plants:**

Map with plant biodiversity (count of species) per region with the option to view the map at the continent level (level 1) to to state level (level 3).  Level 1 displays a more hollistic map of the world with the species count per region, while level 3 displays a state view with species count per state. The map is driven by plant species count, so ultimately the colors indicate the varying levels of plant diversity across the world. The multiple views not only allow viewers to see plant diversity across the world, but also in areas that are native to them.

**Fungi:**

Heat map displaying count of fungi observations by location. The heat map is driven by count, so the areas of the globe where more fungi observations were found appear darker than those with a lesser amount.


# **Next Steps:**

We could enhance our dashboard by also adding animal data. This would involve the same process as extracting the plant data and we would have to load a large number of JSON files into SQLite and utilize the lat and lon data to map by animal count per region. Another enhancement would be to drill down into the plants map further and show pictures of plant species native to each continent.

Additionally, we would like to build out our dashboard to provide a sumamry of some of the plants in each region with images of the plants.












