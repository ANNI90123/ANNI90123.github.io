---
layout: default2
---

## Property Observation


<div class="uk-grid uk-child-width-1-2">
    <div>
        <div class="uk-card uk-card-hover uk-card-body uk-padding-small uk-text-center">
            <svg id="myplot"></svg>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-hover uk-card-body uk-padding-small uk-text-center">
            <svg id="box"></svg>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-hover uk-card-body uk-padding-small uk-text-center">
            <svg id="scatter"></svg>
        </div>
    </div>
</div>

<div class="uk-grid uk-child-width-1-3">
    <div>
        <div class="uk-card uk-card-hover uk-padding-small">
            <div class="uk-card-header">
                h1 Word count
            </div>
            <div class="uk-card-body uk-text-center">
                <svg id="scatter2" class="uk-align-center"></svg>
            </div>
        </div>
    </div>
</div>


<div id="selector" class="uk-form-custom=target: true">
    <select>
        <option> h1 Word Count</option>
        <option> h2 Word Count</option>
    </select>
</div>

<svg id="groupedBox" width="800px" height="700px"></svg>

<script>
    test2();
    bar_plot("js/alphabet.csv", "#myplot");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#box", "h1 Word Count");
    scatter_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#scatter", "h1 Word Count");
    scatter_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#scatter2", "h1 Word Count");
    grouped_box_plot("js/all_queries_domains_with_ranks_and_snapshots_small.csv", "#groupedBox", "h1 Word Count");
    
</script>