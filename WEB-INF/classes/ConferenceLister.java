import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class ConferenceLister extends HttpServlet {

  private final Gson gson = new Gson();
  private static final String DATA_FILE = "/WEB-INF/conferences.json";

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    List<Conference> conferencesList = readConferencesList();

    String jsonList = gson.toJson(conferencesList);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(jsonList);
  }

  private List<Conference> readConferencesList() throws IOException {
    try (FileReader reader = new FileReader(getServletContext().getRealPath(DATA_FILE))) {
      Type listType = new TypeToken<List<Conference>>(){}.getType();
      return gson.fromJson(reader, listType);
    }
  }

  public static class Conference {
    private int id;
    private String name;
    private String date;
    private String time;


    public int getId() {
      return id;
    }

    public void setId(int id) {
      this.id = id;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getDate() {
      return date;
    }

    public void setDate(String date) {
      this.date = date;
    }

    public String getTime() {
      return time;
    }

    public void setTime(String time) {
      this.time = time;
    }
  }
}