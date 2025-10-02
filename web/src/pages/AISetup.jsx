import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Brain,
  User,
  Briefcase,
  MessageCircle,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { BASE } from "../lib/api";

export default function AIAssistantSetup() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    profession: "",
    company: "",
    expertise: "",
    personalBio: "",
    businessDescription: "",
    services: "",
    achievements: "",
    communication_style: "",
    faq_topics: "",
  });

  const [isLoading,SetIsLoading] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const pdfFiles = Array.from(files).filter(
        (file) => file.type === "application/pdf"
      );
      if (pdfFiles.length !== files.length) {
        console.log("Only pdfs are allowed")
      }
      setUploadedFiles((prev) => [...prev, ...pdfFiles]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
  // if (!formData.fullName || !formData.profession || !formData.personalBio) {
  //   console.log("Required fields missing");
  //   return;
  // }

  try {
    SetIsLoading(true)
    const data = new FormData();
    data.append("formData", JSON.stringify(formData));
    uploadedFiles.forEach((file) => {
      data.append("files", file);
    });

    const res = await fetch(BASE+"/auth/store-info", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: data,
    });

    const result = await res.json();
    if (res.ok) {
      console.log("✅ Info saved:", result);
    } else {
      console.error("❌ Error:", result.message);
    }
  } catch (err) {
    console.error("Server error:", err);
  } finally {
    SetIsLoading(false)
  }
  };

  const isButtonDisabled = () => {
    return false;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="md:container flex items-center justify-between py-4">
          <Button
            variant="ghost"
            size="xs md:sm"
            className="flex items-center gap-2 px-0 text-xs md:text-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center md:gap-1">
            <div className="h-8 w-8 rounded-lg bg-gradient-instagram flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm md:text-xl font-bold text-foreground">
              AI Assistant Setup
            </span>
          </div>
        <Button
          onClick={handleSave}
          size="sm"
          className="bg-gradient-instagram shadow-instagram hover:opacity-90 transition px-0 md:px-2 text-xs md:text-sm gap-1 md:gap-2"
          disabled={isLoading || isButtonDisabled()}
        >
          {!isLoading ? (
            <>
              <Check className="w-3 h-3 md:mr-2" />
              Save Profile
            </>
          ) : (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving Profile...
            </>
          )}
        </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:container py-8 space-y-6 max-w-6xl mx-auto">
        {/* Intro */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6 flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Personalize Your AI Assistant
              </h2>
              <p className="text-muted-foreground text-sm md:text-sm">
                Provide information about yourself so your AI assistant can
                respond to Instagram DMs with personalized, relevant answers
                that represent you authentically.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Info */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Enter your full name"
                  className=" placeholder:text-xs md:placeholder:text-sm  text text-xs md:text-sm"
                />
              </div>
              <div>
                <Label>Profession/Title *</Label>
                <Input
                  value={formData.profession}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  placeholder="e.g., Digital Marketing Expert"
                   className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                />
              </div>
              <div>
                <Label>Company/Brand</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company or personal brand"
                   className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                />
              </div>
              <div>
                <Label>Areas of Expertise</Label>
                <Textarea
                  value={formData.expertise}
                  onChange={(e) =>
                    handleInputChange("expertise", e.target.value)
                  }
                  placeholder="List your main skills and expertise areas..."
                   className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Info */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Services/Products Offered</Label>
                <Textarea
                  value={formData.services}
                  onChange={(e) =>
                    handleInputChange("services", e.target.value)
                  }
                  placeholder="Describe what you offer..."
                  className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                  rows={4}
                />
              </div>
              <div>
                <Label>Key Achievements</Label>
                <Textarea
                  value={formData.achievements}
                  onChange={(e) =>
                    handleInputChange("achievements", e.target.value)
                  }
                  placeholder="Notable accomplishments, awards..."
                  className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                  
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Context */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Detailed Context
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Personal Bio *</Label>
              <Textarea
                value={formData.personalBio}
                onChange={(e) =>
                  handleInputChange("personalBio", e.target.value)
                }
                placeholder="Write a comprehensive bio..."
                className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                rows={6}
              />
            </div>
            <div>
              <Label>Business/Work Description</Label>
              <Textarea
                value={formData.businessDescription}
                onChange={(e) =>
                  handleInputChange("businessDescription", e.target.value)
                }
                placeholder="Detailed description of your work, values..."
                className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                rows={5}
              />
            </div>
            <div>
              <Label>Communication Style</Label>
              <Textarea
                value={formData.communication_style}
                onChange={(e) =>
                  handleInputChange("communication_style", e.target.value)
                }
                placeholder="Formal/casual, friendly/professional..."
                className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                rows={3}
              />
            </div>
            <div>
              <Label>Common Questions & Topics</Label>
              <Textarea
                value={formData.faq_topics}
                onChange={(e) =>
                  handleInputChange("faq_topics", e.target.value)
                }
                placeholder="List common questions you get..."
                className=" placeholder:text-xs md:placeholder:text-sm text-xs md:text-sm"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Documents (PDF)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <Label htmlFor="fileUpload" className="cursor-pointer">
                <span className="md:text-sm text-muted-foreground">
                  Upload PDFs with additional context (resumes, portfolios,
                  etc.)
                </span>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
              <Button variant="outline" className="mt-2"  onClick={() => fileInputRef.current.click()}>
                Choose Files
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files:</Label>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-secondary/50 rounded"
                  >
                    <div className="flex items-center gap-2 flex-col md:flex-row">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-xs md:text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
