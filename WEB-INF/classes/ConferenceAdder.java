import java.io.*;
import java.lang.reflect.Type;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

public class ConferenceAdder extends HttpServlet {

  private final Gson gson = new Gson();
  private static final String DATA_FILE = "/WEB-INF/conferences.json";

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Conference newConference = gson.fromJson(new InputStreamReader(request.getInputStream()), Conference.class);
    
    List<Conference> conferencesList = readConferencesList();
    
    int nextId = conferencesList.stream().mapToInt(Conference::getId).max().orElse(0) + 1;
    newConference.setId(nextId); 
    
    conferencesList.add(newConference);

    writeConferencesList(conferencesList);

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(gson.toJson(newConference));
  }

  private List<Conference> readConferencesList() throws IOException {
    try (JsonReader reader = new JsonReader(new FileReader(getServletContext().getRealPath(DATA_FILE)))) {
        Type listType = new TypeToken<List<Conference>>(){}.getType();
        return gson.fromJson(reader, listType);
    }
  }

  private void writeConferencesList(List<Conference> conferencesList) throws IOException {
    try (FileWriter writer = new FileWriter(getServletContext().getRealPath(DATA_FILE))) {
        Type listType = new TypeToken<List<Conference>>(){}.getType();
        gson.toJson(conferencesList, listType, writer);
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