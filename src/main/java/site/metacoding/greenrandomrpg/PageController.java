package site.metacoding.greenrandomrpg;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/battlepage")
    public String battlepage() {
        return "battlePage";
    }

    @GetMapping("/store")
    public String store() {
        return "store";
    }

    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping("/main")
    public String main() {
        return "main";
    }

    @GetMapping("/ready")
    public String ready() {
        return "readyBattlePage";
    }

}
