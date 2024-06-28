---
layout: default2
---
## General


<svg id="myplot" width="800px" height="400px"></svg>
<svg id="scatter" width="800px" height="400px"></svg>
<svg id="groupedBox" width="800px" height="800px"></svg>
<script>
    //import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
    bar_plot("js/alphabet.csv", "#myplot");
    box_plot("js/all_queries_domains_with_ranks_and_snapshots.csv", "#scatter", "h1 Word Count");
    grouped_box_plot("js/all_queries_domains_with_ranks_and_snapshots_small.csv", "#groupedBox", "h1 Word Count");
</script>