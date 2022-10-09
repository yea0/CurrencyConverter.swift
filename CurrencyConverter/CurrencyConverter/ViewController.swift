//
//  ViewController.swift
//  CurrencyConverter
//
//  Created by Yea on 30.09.2022.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var cadLabel: UILabel!
    @IBOutlet weak var chfLabel: UILabel!
    @IBOutlet weak var tryLabel: UILabel!
    @IBOutlet weak var usdLabel: UILabel!
    @IBOutlet weak var eurLabel: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func getRatesClicked(_ sender: Any) {
        // Step 1 : Request & Session
        // Step 2 : Response & Data
        // Step 3 : Parsing & JSON serialization
        
        let url = URL(string: "https://raw.githubusercontent.com/atilsamancioglu/CurrencyData/main/currency.json")
        
        let session = URLSession.shared
        
        //Closure
        let task = session.dataTask(with: url!) { (data, response, error) in
            if error != nil {
                let alert = UIAlertController(title: "Error", message: error?.localizedDescription, preferredStyle: UIAlertController.Style.alert)
                let okButton = UIAlertAction(title: "Ok", style: UIAlertAction.Style.default, handler: nil)
                alert.addAction(okButton)
                self.present(alert, animated: true, completion: nil)
                
            } else {
                //2.Step
                if data != nil {
                    do {
                        let jsonSerialization = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers) as! Dictionary<String,Any>
                        
                        DispatchQueue.main.async {
                            if let rates = jsonSerialization["rates"] as? [String : Any]{
                                print("rates")
                                if let cad = rates["CAD"] as? Double {
                                    self.cadLabel.text = "CAD: \(cad)"
                                }
                                if let chf = rates["CHF"] as? Double{
                                    self.chfLabel.text = "CHF: \(chf)"
                                }
                                if let Try = rates["TRY"] as? Double{
                                    self.tryLabel.text = "TRY: \(Try)"
                                }
                                if let usd = rates["USD"] as? Double{
                                    self.usdLabel.text = "USD: \(usd)"
                                }
                                if let eur = rates["EUR"] as? Double{
                                    self.eurLabel.text = "EUR: \(eur)"
                                }
                            }
                            
                            
                        }
                    } catch {
                        print("Error")
                    }
                }
            }
        }
        task.resume()
        
    }
    
}

