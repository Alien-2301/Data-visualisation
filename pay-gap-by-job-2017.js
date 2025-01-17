function PayGapByJob2017() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Pay gap by job: 2017';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'pay-gap-by-job-2017';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  this.pad = 20;
  this.dotSizeMin = 15;
  this.dotSizeMax = 40;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the axes.
    this.addAxes();

    // Get data from the table object.
    var jobs = this.data.getColumn('job_subtype');
    var propFemale = this.data.getColumn('proportion_female');
    var payGap = this.data.getColumn('pay_gap');
    var numJobs = this.data.getColumn('num_jobs');

    // Convert numerical data from strings to numbers.
    propFemale = stringsToNumbers(propFemale);
    payGap = stringsToNumbers(payGap);
    numJobs = stringsToNumbers(numJobs);

    // Set ranges for axes.
    //
    // Use full 100% for x-axis (proportion of women in roles).
    var propFemaleMin = 0;
    var propFemaleMax = 100;

    // For y-axis (pay gap) use a symmetrical axis equal to the
    // largest gap direction so that equal pay (0% pay gap) is in the
    // centre of the canvas. Above the line means men are paid
    // more. Below the line means women are paid more.
    var payGapMin = -20;
    var payGapMax = 20;

    // Find smallest and largest numbers of people across all
    // categories to scale the size of the dots.
    var numJobsMin = min(numJobs);
    var numJobsMax = max(numJobs);


    //Labels
    var label_x = width + this.pad;
    var label_y = height - this.pad;
    textAlign(CENTER, CENTER);

    //labels for the scale
    fill(0);
    text('PayGapMax', label_x/2, label_y);
    text('PayGapMin', label_x/2, this.pad);
    text('FemaleMax', label_x, label_y/2);
    text('FemaleMin', this.pad, label_y/2);

    //origin indiciator
    var origin_x = (width+10)/2;
    var origin_y = (height+10)/2;
    textAlign(LEFT, TOP);
    text('0', origin_x, origin_y, height/8, width/2);
    noFill();
    

    fill(255);
    stroke(0);
    strokeWeight(1);

    for (i = 0; i < this.data.getRowCount(); i++) {
      // Draw an ellipse for each point.
      var x = map(propFemale[i], propFemaleMin, propFemaleMax, this.pad, width - this.pad);
      var y = map(payGap[i], payGapMin, payGapMax, height - this.pad, this.pad);
      var diameter = map(numJobs[i], numJobsMin, numJobsMax, this.dotSizeMin, this.dotSizeMax);
      ellipse(x, y, diameter, diameter);
    }
  };

  this.addAxes = function () {
    stroke(200);

    // Add vertical line.
    strokeWeight(2);
    line(width / 2,
         this.pad,
         width / 2,
         height - this.pad);

    // Add horizontal line.
    line(this.pad,
         height / 2,
         width - this.pad,
         height / 2);
  };
  strokeWeight(1);
}
