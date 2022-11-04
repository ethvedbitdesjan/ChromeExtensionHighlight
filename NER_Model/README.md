
To train model using Dice Loss use the dice_loss.py file and the code from https://github.com/ShannonAI/mrc-for-flat-nested-ner.

In the mrc_ner_trainer.py file in the repository above, change the code to use the DiceLoss function from dice_loss.py instead of the BCE Loss function used originally.

Then use the hyperparameters as described in NER_Model_Trainer.ipynb file.
