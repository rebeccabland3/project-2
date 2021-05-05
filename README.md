# species-project


**Topic:** Plant and Fungi Global Biodiversity 


**Goal:** Build a dashboard to display the location of different fungi and plants around the world.
 
**Data Sources:** 

Plant API: https://docs.trefle.io/docs/examples/snippets

Fungal dataset: https://springernature.figshare.com/collections/GlobalFungi_Global_database_of_fungal_records_from_high-throughput-sequencing_metabarcoding_studies/4915392


**Data Collection Process:** 

We collected our plant data using the Trefle API and extracted species count by region. Due to the large amount of data, we had to download several individual JSONs and load them into SQLite. Our fungi data was exracted using a CSV.

(flow chart)

**Visualizations:**

Plants:

Map with biodiversity (count of species) per region with L1 - L4

Fungi:

Heat map displaying count of fungi by location








Map with biodiversity (count of species) per region
Region size (level 1-4) could be selected by user if we would like to provide that ability
This would use distribution table ONLY
User selects the plant family or genus to see (pepper, rose, etc.) - buttons, dropdown, other interactive option
Could display plant family summary
Count of plants in family
Count of families in genus (if we opted for genus to be selected)
Issue is genus names are less well known that family names to the end user

Display one to three images of the plants in the family
List plants (scientific name) - a ton of data though
Could link to listing of ALL plants in family with option to look at photos that are available (many don’t have links but some do)
Species table looks like best option for this dashboard
Fungi
Map with biodiversity (count of species) per region
Need to transpose the lat lon of fungi data into regional level (or all four levels if we opt to allow user choice)
Where the fungi sample was taken from (meaning where the fungi grows on)
Trees, leaves, logs, ground, etc.
Fungus names not available
If we map out fungi data and it doesn't seem complete we can 
