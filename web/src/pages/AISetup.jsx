import { useState } from "react";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { useToast } from "../hooks/use-toast";

export default function AIAssistantSetup() {
  const navigate = useNavigate();
  const { toast } = useToast();

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
        toast({
          title: "Invalid File Type",
          description: "Only PDF files are allowed.",
          variant: "destructive",
        });
      }
      setUploadedFiles((prev) => [...prev, ...pdfFiles]);
      toast({
        title: "Files Uploaded",
        description: `${pdfFiles.length} PDF file(s) added successfully.`,
      });
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: "File Removed",
      description: "File has been removed from your profile.",
    });
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.profession || !formData.personalBio) {
      toast({
        title: "Missing Required Fields",
        description:
          "Please fill in at least your name, profession, and personal bio.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile Saved Successfully!",
      description:
        "Your AI assistant context has been updated. It will now provide personalized responses based on your information.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-instagram flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AI Assistant Setup
            </span>
          </div>
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-gradient-instagram shadow-instagram hover:opacity-90 transition"
          >
            <Check className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container py-8 space-y-6 max-w-4xl mx-auto">
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
              <p className="text-muted-foreground">
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
                />
              </div>
              <div>
                <Label>Company/Brand</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company or personal brand"
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
                <span className="text-sm text-muted-foreground">
                  Upload PDFs with additional context (resumes, portfolios,
                  etc.)
                </span>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
              <Button variant="outline" className="mt-2">
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
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">{file.name}</span>
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

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-bold">?</span>
              </div>
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Tips for better AI responses:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Be specific about your expertise and services</li>
                  <li>Include common questions you receive</li>
                  <li>Mention your communication style</li>
                  <li>Upload documents that showcase your work</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
