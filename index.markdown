---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default2
---
# Hello


<svg id="chart0" width="800px" height="400px"></svg> 
<svg id="chart1" width="800px" height="400px"></svg> 

<div class="matrix">
    <svg id="m11"></svg>
    <svg id="m12"></svg>
    <svg id="m13"></svg>
    <svg id="m21"></svg>
    <svg id="m22"></svg>
    <svg id="m23"></svg>
    <svg id="m31"></svg>
    <svg id="m32"></svg>
    <svg id="m33"></svg>
</div>
<script>
    scatterPlot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#m11", "h1 Word Count");
    scatterPlot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#m12", "h2 Word Count");
    scatterPlot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#m13", "h3 Word Count");    
    scatterPlot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#chart0", "h1 Word Count");
    plot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#chart1", "h1 Word Count");
</script>