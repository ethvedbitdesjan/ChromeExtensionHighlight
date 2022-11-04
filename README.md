# ChromeExtensionHighlight
ChromeExtensionHighlight
Chrome Extension for Highlighting Entities on a webpage. Yellow: Person, Blue: Location, Green: Organization, Brown: Miscellaneous

When packaging the extension please exclude the NER_Model folder. The folder contians files to train a NER model and host it using a Flask API.

To run the extension, please run the test_bert_ner.py file from the Ner_Model folder to serve as a server for the extension to connect to. Additionally, change the url in the payload.js file to connect to the server appropriately.

Instructions for training the model are present in the README of the NER_Model folder.
