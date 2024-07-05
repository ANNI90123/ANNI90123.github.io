---
layout: default2
---

## Property Observation


<article class="uk-article">
    In the following you can see how different characteristics of websites can be related to their rank.
</article>

<div class="uk-grid uk-child-width-1-2 uk-margin-medium">
    <div>
        <div class="uk-card uk-card-default uk-padding-small uk-text-center">
            <div class="uk-card-header">
                <h3> Number of h1 tags </h3>
            </div>
            <div class="uk-card-body uk-height-medium">
                <svg id="ID01" class="uk-height-1-1 uk-width-1-1"></svg>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-padding-small uk-text-center">
            <div class="uk-card-header">
                <h3> Number of h2 tags</h3>
            </div>
            <div class="uk-card-body uk-height-medium">
                <svg id="ID02" class="uk-height-1-1 uk-width-1-1"></svg>
            </div>
        </div>
    </div>
</div>

<div class="uk-grid uk-child-width-1-2">
    <div>
        <div class="uk-card uk-card-default uk-padding-small uk-text-center">
            <div class="uk-card-header">
                <h3> Number of h3 tags</h3>
            </div>
            <div class="uk-card-body uk-height-medium">
                <svg id="ID03" class="uk-height-1-1 uk-width-1-1"></svg>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-padding-small uk-text-center">
            <div class="uk-card-header">
                <h3> Number of h4 tags</h3>
            </div>
            <div class="uk-card-body uk-height-medium">
                <svg id="ID04" class="uk-height-1-1 uk-width-1-1"></svg>
            </div>
        </div>
    </div>
</div>

<div class="uk-grid uk-child-width-1-2">
    <div>
        <div class="uk-card uk-card-default uk-padding-small uk-text-center">
            <div class="uk-card-header">
                <h3> FWR</h3>
            </div>
            <div class="uk-card-body uk-height-medium">
                <svg id="ID05" class="uk-height-1-1 uk-width-1-1"></svg>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-padding-small uk-text-center">
            <div class="uk-card-header">
                <h3> TTR</h3>
            </div>
            <div class="uk-card-body uk-height-medium">
                <svg id="ID06" class="uk-height-1-1 uk-width-1-1"></svg>
            </div>
        </div>
    </div>
</div>


<!-- 
<div id="selector" class="uk-form-custom=target: true">
    <select>
        <option> h1 Word Count</option>
        <option> h2 Word Count</option>
    </select>
</div>-->



<script>
    //test2();
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#ID01", "h1 Word Count");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#ID02", "h2 Word Count");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#ID03", "h3 Word Count");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#ID04", "h4 Word Count");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#ID05", "FWR");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#ID06", "TTR");    
</script>