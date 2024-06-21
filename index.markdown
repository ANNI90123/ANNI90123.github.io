---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
# Hello


<svg id="chart0" width="1000px" height="700px"></svg> 
<svg id="chart1" width="1000px" height="700px"></svg> 

<select id="selectButton"></select>
<svg id="charti" width="1000px" height="700px"></svg> 
<script>
    scatterPlot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#chart0", "h1 Word Count");
    plot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#chart1", "h1 Word Count");
    filter();
    update("js/all_queries_domains_with_ranks_and_snapshots.csv", 1)
</script>