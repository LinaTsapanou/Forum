package selenium;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ForumTest {

	WebDriver driver;
	
    @BeforeClass
    void setUpClass() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Claudia.Badila\\Downloads\\chromedriver_win32\\chromedriver.exe");
    }
    @AfterClass
    void cleanUpClass() {
        System.clearProperty("webdriver.chrome.driver");
    }
    @BeforeMethod
    void setUpMethod() {
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/");
        driver.manage().window().maximize();
      // WebElement cookies = driver.findElement(By.id("L2AGLb"));
       // cookies.click();
    }
    @AfterMethod
    void cleanUp() {
    	try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        driver.quit();
    }
    @Test
    void TestApp() {
    	try {
    		Thread.sleep(500);
			WebElement element = driver.findElement(By.name("acordeon"));
			Thread.sleep(500);
	    	element.click();
	    	Thread.sleep(500);
//	    	List<WebElement> elements =  driver.findElements(By.tagName("input"));
//			Thread.sleep(500);
//			elements.get(0).sendKeys("lola@lola.com");
//			Thread.sleep(500);
//			elements.get(1).sendKeys("123");
			WebElement button = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/div[2]/div/div[1]/ul/li/a"));
        	button.click();
//        	Thread.sleep(500);
		} catch (InterruptedException e) {

			e.printStackTrace();
		}		
		
	WebElement result= driver.findElement(By.id("menuAcordeon"));

	Assert.assertEquals("div", result.getTagName());
    }
}
