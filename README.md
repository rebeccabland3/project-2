# species-project


**Topic:** Plant and Fungi Global Biodiversity 


**Goal:** Build a dashboard to display the location of different plants and fungi around the world.
 
**Data Sources:** 

Plant API: https://docs.trefle.io/docs/examples/snippets

Fungal dataset: https://springernature.figshare.com/collections/GlobalFungi_Global_database_of_fungal_records_from_high-throughput-sequencing_metabarcoding_studies/4915392


**Data Collection Process:** 

We collected our plant data using the Trefle API and extracted species count by region. Due to the large amount of data, we had to download several individual JSONs and load them into SQLite. Our fungi data was exracted using a CSV.


**Visualizations:**

Plants:

Map with biodiversity (count of species) per region with L1 - L4

Fungi:

Heat map displaying count of fungi by location











