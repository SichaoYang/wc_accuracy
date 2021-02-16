# wc-accuracy
#### LCNL, UW-Madison
#### Fall 2018

## Files needed
1. Add `data` folder containing `cbal.csv` files to `static/wc_accuracy/`
2. Add `stim` folder, containing all relevant .jpg files, to `static/wc_accuracy/`

## Set up the experiment
1. Launch the command prompt
2. Go to the root directory of the experiment: ```cd path/to/wc_accuracy/```
3. Set up the local server: ```python setup.py```
4. Open the browser and visit : ```http://localhost:8000/wc_accuracy.html```
5. Input the participant id into the entry
6. Select the counter balance csv file to use from the drop-down list
7. Click "Start Experiment" to start the experiment

Note: by selecting "Random", a counter balance csv file will be randomly picked with a probability 
in proportion to its weight assigned in the variable *csv_porb* in *wc_accuracy.html*.
Edit it to modify the probability distribution specified if needed.

## Collect data
The experiment ends up staying on the last page.

Click "Export Collected Data" to download the data collected.

## Restart the experiment
Reload the page.
